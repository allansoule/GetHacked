import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GetHackedSharedModule } from 'app/shared';
import {
    RequestComponent,
    RequestDetailComponent,
    RequestUpdateComponent,
    RequestDeletePopupComponent,
    RequestDeleteDialogComponent,
    requestRoute,
    requestPopupRoute
} from './';

const ENTITY_STATES = [...requestRoute, ...requestPopupRoute];

@NgModule({
    imports: [GetHackedSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RequestComponent,
        RequestDetailComponent,
        RequestUpdateComponent,
        RequestDeleteDialogComponent,
        RequestDeletePopupComponent
    ],
    entryComponents: [RequestComponent, RequestUpdateComponent, RequestDeleteDialogComponent, RequestDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetHackedRequestModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
