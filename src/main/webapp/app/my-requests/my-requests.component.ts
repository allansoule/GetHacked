import { Component, OnInit } from '@angular/core';
import { Requests } from 'app/requests/requests';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyRequestsService } from 'app/my-requests/my-requests.service';

@Component({
    selector: 'jhi-my-requests',
    templateUrl: './my-requests.component.html',
    styleUrls: ['my-requests.css']
})
export class MyRequestsComponent implements OnInit {
    result: Requests[];
    constructor(private modalService: NgbModal, private myRequestsService: MyRequestsService) {}
    ngOnInit() {
        this.myRequestsService.getRequestsByThirdParty().subscribe(res => (this.result = res));
    }
}
