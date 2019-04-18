import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';
import { UserThirdPartyMembershipService } from './user-third-party-membership.service';

@Component({
    selector: 'jhi-user-third-party-membership-delete-dialog',
    templateUrl: './user-third-party-membership-delete-dialog.component.html'
})
export class UserThirdPartyMembershipDeleteDialogComponent {
    userThirdPartyMembership: IUserThirdPartyMembership;

    constructor(
        protected userThirdPartyMembershipService: UserThirdPartyMembershipService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userThirdPartyMembershipService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'userThirdPartyMembershipListModification',
                content: 'Deleted an userThirdPartyMembership'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-third-party-membership-delete-popup',
    template: ''
})
export class UserThirdPartyMembershipDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ userThirdPartyMembership }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(UserThirdPartyMembershipDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.userThirdPartyMembership = userThirdPartyMembership;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/user-third-party-membership', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/user-third-party-membership', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
