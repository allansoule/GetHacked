import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

@Component({
    selector: 'jhi-user-third-party-membership-detail',
    templateUrl: './user-third-party-membership-detail.component.html'
})
export class UserThirdPartyMembershipDetailComponent implements OnInit {
    userThirdPartyMembership: IUserThirdPartyMembership;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userThirdPartyMembership }) => {
            this.userThirdPartyMembership = userThirdPartyMembership;
        });
    }

    previousState() {
        window.history.back();
    }
}
