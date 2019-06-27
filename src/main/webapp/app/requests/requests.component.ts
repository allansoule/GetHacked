import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from 'app/requests/requests.service';
import { Requests } from 'app/requests/requests';

@Component({
    selector: 'jhi-requests',
    templateUrl: './requests.component.html',
    styleUrls: ['requests.css']
})
export class RequestsComponent implements OnInit {
    result: Requests[];
    constructor(private modalService: NgbModal, private requestsService: RequestsService) {}
    ngOnInit() {
        this.requestsService.getRequests().subscribe(res => (this.result = res));
    }
    search(f) {
        console.log(this.requestsService.searchRequest(f.value).subscribe(res => (this.result = res)));
    }
}
