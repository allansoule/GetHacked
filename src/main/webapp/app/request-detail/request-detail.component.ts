import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestDetailService } from 'app/request-detail/request-detail.service';
import { ActivatedRoute } from '@angular/router';
import { Requests } from 'app/requests/requests';

@Component({
    selector: 'jhi-request-detail',
    templateUrl: './request-detail.component.html',
    styles: []
})
export class RequestDetailComponent implements OnInit {
    result: Requests;
    idRequest: number;
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.idRequest = params['id'];
        });
        this.requestDetailService.getRequestDetail(this.idRequest).subscribe(res => (this.result = res));
    }
    constructor(
        private modalService: NgbModal,
        private requestDetailService: RequestDetailService,
        private activatedRoute: ActivatedRoute
    ) {}
}
