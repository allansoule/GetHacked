import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThirdParty } from 'app/shared/model/third-party.model';
import { ThirdPartyService } from './third-party.service';

@Component({
    selector: 'jhi-third-party-delete-dialog',
    templateUrl: './third-party-delete-dialog.component.html'
})
export class ThirdPartyDeleteDialogComponent {
    thirdParty: IThirdParty;

    constructor(
        protected thirdPartyService: ThirdPartyService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thirdPartyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thirdPartyListModification',
                content: 'Deleted an thirdParty'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-third-party-delete-popup',
    template: ''
})
export class ThirdPartyDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thirdParty }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ThirdPartyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.thirdParty = thirdParty;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/third-party', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/third-party', { outlets: { popup: null } }]);
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
