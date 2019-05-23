import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { GethackedService } from 'app/features/gethacked.service';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { GetHackedSharedModule } from 'app/shared';
import { GetHackedCoreModule } from 'app/core';
import { GetHackedAppRoutingModule } from './app-routing.module';
import { GetHackedHomeModule } from './home/home.module';
import { GetHackedAccountModule } from './account/account.module';
import { GetHackedEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ActiveMenuDirective, ErrorComponent } from './layouts';
import { OurThirdPartyComponent } from 'app/our-third-party/our-third-party.component';
import { RequestsComponent } from './requests/requests.component';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ReportsComponent } from './reports/reports.component';
import { SelectReportsComponent } from './select-reports/select-reports.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RegisterThirdpartyComponent } from 'app/features/thirdparty/register-thirdparty.component';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        GetHackedSharedModule.forRoot(),
        GetHackedCoreModule,
        GetHackedHomeModule,
        GetHackedAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GetHackedEntityModule,
        GetHackedAppRoutingModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        OurThirdPartyComponent,
        RequestsComponent,
        CreateRequestComponent,
        ReportsComponent,
        SelectReportsComponent,
        RequestDetailComponent,
        RegisterThirdpartyComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        },
        GethackedService
    ],
    bootstrap: [JhiMainComponent]
})
export class GetHackedAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
