import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from './third-party.service';
import { ThirdPartyComponent } from './third-party.component';
import { ThirdPartyDetailComponent } from './third-party-detail.component';
import { ThirdPartyUpdateComponent } from './third-party-update.component';
import { ThirdPartyDeletePopupComponent } from './third-party-delete-dialog.component';
import { IThirdParty } from 'app/shared/model/third-party.model';

@Injectable({ providedIn: 'root' })
export class ThirdPartyResolve implements Resolve<IThirdParty> {
    constructor(private service: ThirdPartyService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IThirdParty> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<ThirdParty>) => response.ok),
                map((thirdParty: HttpResponse<ThirdParty>) => thirdParty.body)
            );
        }
        return of(new ThirdParty());
    }
}

export const thirdPartyRoute: Routes = [
    {
        path: '',
        component: ThirdPartyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.thirdParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ThirdPartyDetailComponent,
        resolve: {
            thirdParty: ThirdPartyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.thirdParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ThirdPartyUpdateComponent,
        resolve: {
            thirdParty: ThirdPartyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.thirdParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ThirdPartyUpdateComponent,
        resolve: {
            thirdParty: ThirdPartyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.thirdParty.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thirdPartyPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ThirdPartyDeletePopupComponent,
        resolve: {
            thirdParty: ThirdPartyResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.thirdParty.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
