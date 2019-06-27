import { Route } from '@angular/router';

import { ReportContentComponent } from 'app/report-content/report-content.component';

export const REPORTCONTENT_ROUTE: Route = {
    path: 'report-content',
    component: ReportContentComponent,
    data: {
        authorities: [],
        pageTitle: 'All Requests'
    }
};
