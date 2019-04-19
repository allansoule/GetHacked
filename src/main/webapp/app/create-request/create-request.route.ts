import { Route } from '@angular/router';

import { CreateRequestComponent } from 'app/create-request/create-request.component';

export const CREATE_ROUTE: Route = {
    path: 'createrequest',
    component: CreateRequestComponent,
    data: {
        authorities: [],
        pageTitle: 'createrequest'
    }
};
