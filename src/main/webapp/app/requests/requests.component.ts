import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from 'app/requests/requests.service';
import { Requests } from 'app/requests/requests';

@Component({
    selector: 'jhi-requests',
    templateUrl: './requests.component.html',
    styles: []
})
export class RequestsComponent implements OnInit {
    result: Requests[];
    ngOnInit() {
        this.requestsService.getRequests().subscribe(res => (this.result = res));
    }
    constructor(private modalService: NgbModal, private requestsService: RequestsService) {}
}
