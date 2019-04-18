import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IReport } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from 'app/entities/third-party';
import { IRequest } from 'app/shared/model/request.model';
import { RequestService } from 'app/entities/request';

@Component({
    selector: 'jhi-report-update',
    templateUrl: './report-update.component.html'
})
export class ReportUpdateComponent implements OnInit {
    report: IReport;
    isSaving: boolean;

    thirdparties: IThirdParty[];

    requests: IRequest[];
    date: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected reportService: ReportService,
        protected thirdPartyService: ThirdPartyService,
        protected requestService: RequestService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ report }) => {
            this.report = report;
            this.date = this.report.date != null ? this.report.date.format(DATE_TIME_FORMAT) : null;
        });
        this.thirdPartyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IThirdParty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IThirdParty[]>) => response.body)
            )
            .subscribe((res: IThirdParty[]) => (this.thirdparties = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.requestService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRequest[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRequest[]>) => response.body)
            )
            .subscribe((res: IRequest[]) => (this.requests = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.report.date = this.date != null ? moment(this.date, DATE_TIME_FORMAT) : null;
        if (this.report.id !== undefined) {
            this.subscribeToSaveResponse(this.reportService.update(this.report));
        } else {
            this.subscribeToSaveResponse(this.reportService.create(this.report));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReport>>) {
        result.subscribe((res: HttpResponse<IReport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackRequestById(index: number, item: IRequest) {
        return item.id;
    }
}
