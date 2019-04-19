import { Route } from '@angular/router';

import { RequestsComponent } from './requests.component';

export const REQUESTS_ROUTE: Route = {
    path: 'requests',
    component: RequestsComponent,
    data: {
        authorities: [],
        pageTitle: 'All Requests'
    }
};
