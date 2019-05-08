import { Route } from '@angular/router';

import { OurThirdPartyComponent } from './our-third-party.component';

export const USERS_ROUTE: Route = {
    path: 'users',
    component: OurThirdPartyComponent,
    data: {
        authorities: [],
        pageTitle: 'All Users'
    }
};
