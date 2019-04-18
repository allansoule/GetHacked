import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GetHackedSharedModule } from 'app/shared';
import {
    ThirdPartyComponent,
    ThirdPartyDetailComponent,
    ThirdPartyUpdateComponent,
    ThirdPartyDeletePopupComponent,
    ThirdPartyDeleteDialogComponent,
    thirdPartyRoute,
    thirdPartyPopupRoute
} from './';

const ENTITY_STATES = [...thirdPartyRoute, ...thirdPartyPopupRoute];

@NgModule({
    imports: [GetHackedSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ThirdPartyComponent,
        ThirdPartyDetailComponent,
        ThirdPartyUpdateComponent,
        ThirdPartyDeleteDialogComponent,
        ThirdPartyDeletePopupComponent
    ],
    entryComponents: [ThirdPartyComponent, ThirdPartyUpdateComponent, ThirdPartyDeleteDialogComponent, ThirdPartyDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetHackedThirdPartyModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
