import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportContentService } from 'app/report-content/report-content.service';
import { Report } from 'app/shared/model/report.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-report-content',
    templateUrl: './report-content.component.html',
    styleUrls: ['report-content.css']
})
export class ReportContentComponent implements OnInit {
    result: Report;
    private idReport: Number;
    constructor(
        private modalService: NgbModal,
        private reportContentService: ReportContentService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.idReport = params['id'];
        });
        this.reportContentService.getReportsByThirdparty(this.idReport).subscribe(res => (this.result = res));
    }
}
