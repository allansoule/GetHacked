import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { USERS_ROUTE } from 'app/our-third-party/our-third-party.route';
import { CREATE_ROUTE } from 'app/create-request/create-request.route';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                USERS_ROUTE,
                CREATE_ROUTE,
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#GetHackedAdminModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class GetHackedAppRoutingModule {}
