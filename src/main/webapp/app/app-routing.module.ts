import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { USERS_ROUTE } from 'app/our-third-party/our-third-party.route';
import { CREATE_ROUTE } from 'app/create-request/create-request.route';
import { CREATE_REPORT_ROUTE } from 'app/reports/reports.route';
import { SELECT_REPORTS_ROUTE } from 'app/select-reports/select-reports-route';
import { REQUESTDETAIL_ROUTE } from 'app/request-detail/request-detail.route';
import { FEATURE_ROUTES } from 'app/features/features.route';
import { MYREQUESTS_ROUTE } from 'app/my-requests/my-requests.route';
import { MYREPORTS_ROUTE } from 'app/my-reports/my-reports.route';
import { REPORTCONTENT_ROUTE } from 'app/report-content/report-content.route';
import { REQUESTSTEMPLATE_ROUTE } from 'app/requeststemplate/requeststemplate.route';
import { REPORTSTEMPLATE_ROUTE } from 'app/reportstemplate/reportstemplate.route';
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                USERS_ROUTE,
                CREATE_ROUTE,
                CREATE_REPORT_ROUTE,
                SELECT_REPORTS_ROUTE,
                REQUESTDETAIL_ROUTE,
                REPORTSTEMPLATE_ROUTE,
                MYREQUESTS_ROUTE,
                MYREPORTS_ROUTE,
                REQUESTSTEMPLATE_ROUTE,
                REPORTCONTENT_ROUTE,
                ...FEATURE_ROUTES,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#GetHackedAdminModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class GetHackedAppRoutingModule {}
