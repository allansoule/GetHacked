import { Route } from '@angular/router';
import { ReportstemplateComponent } from 'app/reportstemplate/reportstemplate.component';

export const REPORTSTEMPLATE_ROUTE: Route = {
    path: 'reportstemplate',
    component: ReportstemplateComponent,
    data: {
        authorities: [],
        pageTitle: 'RequestTemplate'
    }
};
