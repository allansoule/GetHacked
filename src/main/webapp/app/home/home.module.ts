import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GetHackedSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { REQUESTS_ROUTE } from '../requests/requests.route';
import { CREATE_ROUTE } from 'app/create-request/create-request.route';

@NgModule({
    imports: [GetHackedSharedModule, RouterModule.forChild([HOME_ROUTE, REQUESTS_ROUTE, CREATE_ROUTE])],
    declarations: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GetHackedHomeModule {}
