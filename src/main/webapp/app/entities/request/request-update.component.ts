import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IRequest } from 'app/shared/model/request.model';
import { RequestService } from './request.service';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from 'app/entities/third-party';

@Component({
    selector: 'jhi-request-update',
    templateUrl: './request-update.component.html'
})
export class RequestUpdateComponent implements OnInit {
    request: IRequest;
    isSaving: boolean;

    thirdparties: IThirdParty[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected requestService: RequestService,
        protected thirdPartyService: ThirdPartyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ request }) => {
            this.request = request;
            this.date = this.request.date != null ? this.request.date.format(DATE_TIME_FORMAT) : null;
        });
        this.thirdPartyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IThirdParty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IThirdParty[]>) => response.body)
            )
            .subscribe((res: IThirdParty[]) => (this.thirdparties = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.request.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.request.id !== undefined) {
            this.subscribeToSaveResponse(this.requestService.update(this.request));
        } else {
            this.subscribeToSaveResponse(this.requestService.create(this.request));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRequest>>) {
        result.subscribe((res: HttpResponse<IRequest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackThirdPartyById(index: number, item: IThirdParty) {
        return item.id;
    }
}
