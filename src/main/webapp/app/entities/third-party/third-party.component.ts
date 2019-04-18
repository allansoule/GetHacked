import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IThirdParty } from 'app/shared/model/third-party.model';
import { AccountService } from 'app/core';
import { ThirdPartyService } from './third-party.service';

@Component({
    selector: 'jhi-third-party',
    templateUrl: './third-party.component.html'
})
export class ThirdPartyComponent implements OnInit, OnDestroy {
    thirdParties: IThirdParty[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected thirdPartyService: ThirdPartyService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.thirdPartyService
            .query()
            .pipe(
                filter((res: HttpResponse<IThirdParty[]>) => res.ok),
                map((res: HttpResponse<IThirdParty[]>) => res.body)
            )
            .subscribe(
                (res: IThirdParty[]) => {
                    this.thirdParties = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInThirdParties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IThirdParty) {
        return item.id;
    }

    registerChangeInThirdParties() {
        this.eventSubscriber = this.eventManager.subscribe('thirdPartyListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
