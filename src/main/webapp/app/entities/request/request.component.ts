import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRequest } from 'app/shared/model/request.model';
import { AccountService } from 'app/core';
import { RequestService } from './request.service';

@Component({
    selector: 'jhi-request',
    templateUrl: './request.component.html'
})
export class RequestComponent implements OnInit, OnDestroy {
    requests: IRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected requestService: RequestService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.requestService
            .query()
            .pipe(
                filter((res: HttpResponse<IRequest[]>) => res.ok),
                map((res: HttpResponse<IRequest[]>) => res.body)
            )
            .subscribe(
                (res: IRequest[]) => {
                    this.requests = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRequest) {
        return item.id;
    }

    registerChangeInRequests() {
        this.eventSubscriber = this.eventManager.subscribe('requestListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
