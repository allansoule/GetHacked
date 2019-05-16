import { Route } from '@angular/router';

import { SelectReportsComponent } from './select-reports.component';

export const SELECT_REPORTS_ROUTE: Route = {
    path: 'selectreports',
    component: SelectReportsComponent,
    data: {
        authorities: [],
        pageTitle: 'All SelectReports'
    }
};
