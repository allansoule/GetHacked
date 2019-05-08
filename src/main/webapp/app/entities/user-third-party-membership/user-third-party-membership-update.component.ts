import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';
import { UserThirdPartyMembershipService } from './user-third-party-membership.service';
import { IUser, UserService } from 'app/core';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from 'app/entities/third-party';

@Component({
    selector: 'jhi-user-third-party-membership-update',
    templateUrl: './user-third-party-membership-update.component.html'
})
export class UserThirdPartyMembershipUpdateComponent implements OnInit {
    userThirdPartyMembership: IUserThirdPartyMembership;
    isSaving: boolean;

    users: IUser[];

    thirdparties: IThirdParty[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userThirdPartyMembershipService: UserThirdPartyMembershipService,
        protected userService: UserService,
        protected thirdPartyService: ThirdPartyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userThirdPartyMembership }) => {
            this.userThirdPartyMembership = userThirdPartyMembership;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.userThirdPartyMembership.id !== undefined) {
            this.subscribeToSaveResponse(this.userThirdPartyMembershipService.update(this.userThirdPartyMembership));
        } else {
            this.subscribeToSaveResponse(this.userThirdPartyMembershipService.create(this.userThirdPartyMembership));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserThirdPartyMembership>>) {
        result.subscribe(
            (res: HttpResponse<IUserThirdPartyMembership>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackThirdPartyById(index: number, item: IThirdParty) {
        return item.id;
    }
}
