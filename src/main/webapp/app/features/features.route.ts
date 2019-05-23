import { Routes } from '@angular/router';
import { RequestComponent } from 'app/entities/request';
import { RegisterThirdpartyComponent } from 'app/features/thirdparty/register-thirdparty.component';

export const FEATURE_ROUTES: Routes = [
    {
        path: 'register-thirdparty',
        component: RegisterThirdpartyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.request.home.title'
        }
    }
];
