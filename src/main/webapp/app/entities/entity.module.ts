import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'user-third-party-membership',
                loadChildren: './user-third-party-membership/user-third-party-membership.module#GetHackedUserThirdPartyMembershipModule'
            },
            {
                path: 'third-party',
                loadChildren: './third-party/third-party.module#GetHackedThirdPartyModule'
            },
            {
                path: 'report',
                loadChildren: './report/report.module#GetHackedReportModule'
            },
            {
                path: 'request',
                loadChildren: './request/request.module#GetHackedRequestModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetHackedEntityModule {}
