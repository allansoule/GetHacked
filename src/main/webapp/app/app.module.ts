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

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        GetHackedAppRoutingModule,
        MatCardModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatListModule,
        MatStepperModule,
        MatTabsModule,
        MatTreeModule,
        MatButtonToggleModule,
        MatBadgeModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatRippleModule,
        MatBottomSheetModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule
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
