import { Route } from '@angular/router';

import { MyRequestsComponent } from './my-requests.component';

export const MYREQUESTS_ROUTE: Route = {
    path: 'my-requests',
    component: MyRequestsComponent,
    data: {
        authorities: [],
        pageTitle: 'All Requests'
    }
};
