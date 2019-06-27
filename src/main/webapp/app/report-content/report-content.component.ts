import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportContentService } from 'app/report-content/report-content.service';

@Component({
    selector: 'jhi-report-content',
    templateUrl: './report-content.component.html',
    styleUrls: ['report-content.css']
})
export class ReportContentComponent implements OnInit {
    constructor(private modalService: NgbModal, private reportContentService: ReportContentService) {}

    ngOnInit() {}
}
