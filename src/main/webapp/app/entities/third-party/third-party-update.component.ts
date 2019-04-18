import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from './third-party.service';

@Component({
    selector: 'jhi-third-party-update',
    templateUrl: './third-party-update.component.html'
})
export class ThirdPartyUpdateComponent implements OnInit {
    thirdParty: IThirdParty;
    isSaving: boolean;

    constructor(protected thirdPartyService: ThirdPartyService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ thirdParty }) => {
            this.thirdParty = thirdParty;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.thirdParty.id !== undefined) {
            this.subscribeToSaveResponse(this.thirdPartyService.update(this.thirdParty));
        } else {
            this.subscribeToSaveResponse(this.thirdPartyService.create(this.thirdParty));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IThirdParty>>) {
        result.subscribe((res: HttpResponse<IThirdParty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
