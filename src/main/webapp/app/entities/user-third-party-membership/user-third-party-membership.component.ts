import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';
import { AccountService } from 'app/core';
import { UserThirdPartyMembershipService } from './user-third-party-membership.service';

@Component({
    selector: 'jhi-user-third-party-membership',
    templateUrl: './user-third-party-membership.component.html'
})
export class UserThirdPartyMembershipComponent implements OnInit, OnDestroy {
    userThirdPartyMemberships: IUserThirdPartyMembership[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userThirdPartyMembershipService: UserThirdPartyMembershipService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userThirdPartyMembershipService
            .query()
            .pipe(
                filter((res: HttpResponse<IUserThirdPartyMembership[]>) => res.ok),
                map((res: HttpResponse<IUserThirdPartyMembership[]>) => res.body)
            )
            .subscribe(
                (res: IUserThirdPartyMembership[]) => {
                    this.userThirdPartyMemberships = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserThirdPartyMemberships();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserThirdPartyMembership) {
        return item.id;
    }

    registerChangeInUserThirdPartyMemberships() {
        this.eventSubscriber = this.eventManager.subscribe('userThirdPartyMembershipListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
