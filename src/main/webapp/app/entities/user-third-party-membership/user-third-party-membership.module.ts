import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GetHackedSharedModule } from 'app/shared';
import {
    UserThirdPartyMembershipComponent,
    UserThirdPartyMembershipDetailComponent,
    UserThirdPartyMembershipUpdateComponent,
    UserThirdPartyMembershipDeletePopupComponent,
    UserThirdPartyMembershipDeleteDialogComponent,
    userThirdPartyMembershipRoute,
    userThirdPartyMembershipPopupRoute
} from './';

const ENTITY_STATES = [...userThirdPartyMembershipRoute, ...userThirdPartyMembershipPopupRoute];

@NgModule({
    imports: [GetHackedSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserThirdPartyMembershipComponent,
        UserThirdPartyMembershipDetailComponent,
        UserThirdPartyMembershipUpdateComponent,
        UserThirdPartyMembershipDeleteDialogComponent,
        UserThirdPartyMembershipDeletePopupComponent
    ],
    entryComponents: [
        UserThirdPartyMembershipComponent,
        UserThirdPartyMembershipUpdateComponent,
        UserThirdPartyMembershipDeleteDialogComponent,
        UserThirdPartyMembershipDeletePopupComponent
    ],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetHackedUserThirdPartyMembershipModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
