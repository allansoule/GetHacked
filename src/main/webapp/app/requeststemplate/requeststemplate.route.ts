import { Route } from '@angular/router';
import { RequeststemplateComponent } from 'app/requeststemplate/requeststemplate.component';

export const REQUESTSTEMPLATE_ROUTE: Route = {
    path: 'requeststemplate',
    component: RequeststemplateComponent,
    data: {
        authorities: [],
        pageTitle: 'RequestTemplate'
    }
};
