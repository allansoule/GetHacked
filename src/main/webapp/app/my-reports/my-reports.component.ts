import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyReportsService } from 'app/my-reports/my-reports.service';
import { Request } from 'app/shared/model/request.model';

@Component({
    selector: 'jhi-my-reports',
    templateUrl: './my-reports.component.html',
    styleUrls: ['my-reports.css']
})
export class MyReportsComponent implements OnInit {
    result: Request[];
    constructor(private modalService: NgbModal, private myReportsService: MyReportsService) {}

    ngOnInit() {
        this.myReportsService.getRequestByReportsThirdparty().subscribe(res => (this.result = res));
    }
}
