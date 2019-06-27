import { Route } from '@angular/router';

import { MyReportsComponent } from 'app/my-reports/my-reports.component';

export const MYREPORTS_ROUTE: Route = {
    path: 'my-reports',
    component: MyReportsComponent,
    data: {
        authorities: [],
        pageTitle: 'All Requests'
    }
};
