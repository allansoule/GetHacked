import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';
import { UserThirdPartyMembershipService } from './user-third-party-membership.service';
import { UserThirdPartyMembershipComponent } from './user-third-party-membership.component';
import { UserThirdPartyMembershipDetailComponent } from './user-third-party-membership-detail.component';
import { UserThirdPartyMembershipUpdateComponent } from './user-third-party-membership-update.component';
import { UserThirdPartyMembershipDeletePopupComponent } from './user-third-party-membership-delete-dialog.component';
import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

@Injectable({ providedIn: 'root' })
export class UserThirdPartyMembershipResolve implements Resolve<IUserThirdPartyMembership> {
    constructor(private service: UserThirdPartyMembershipService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUserThirdPartyMembership> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<UserThirdPartyMembership>) => response.ok),
                map((userThirdPartyMembership: HttpResponse<UserThirdPartyMembership>) => userThirdPartyMembership.body)
            );
        }
        return of(new UserThirdPartyMembership());
    }
}

export const userThirdPartyMembershipRoute: Routes = [
    {
        path: '',
        component: UserThirdPartyMembershipComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.userThirdPartyMembership.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UserThirdPartyMembershipDetailComponent,
        resolve: {
            userThirdPartyMembership: UserThirdPartyMembershipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.userThirdPartyMembership.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UserThirdPartyMembershipUpdateComponent,
        resolve: {
            userThirdPartyMembership: UserThirdPartyMembershipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.userThirdPartyMembership.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UserThirdPartyMembershipUpdateComponent,
        resolve: {
            userThirdPartyMembership: UserThirdPartyMembershipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.userThirdPartyMembership.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userThirdPartyMembershipPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: UserThirdPartyMembershipDeletePopupComponent,
        resolve: {
            userThirdPartyMembership: UserThirdPartyMembershipResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'getHackedApp.userThirdPartyMembership.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
