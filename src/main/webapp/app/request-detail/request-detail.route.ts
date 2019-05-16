import { Route } from '@angular/router';

import { RequestDetailComponent } from './request-detail.component';

export const REQUESTDETAIL_ROUTE: Route = {
    path: 'requestdetail',
    component: RequestDetailComponent,
    data: {
        authorities: [],
        pageTitle: 'Request'
    }
};
