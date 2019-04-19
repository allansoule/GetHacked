import { Route } from '@angular/router';

import { CreateRequestComponent } from 'app/create-request/create-request.component';
import { ReportsComponent } from 'app/reports/reports.component';

export const CREATE_REPORT_ROUTE: Route = {
    path: 'createreport',
    component: ReportsComponent,
    data: {
        authorities: [],
        pageTitle: 'Create Report'
    }
};
