import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OurThirdPartyService } from 'app/our-third-party/our-third-party.service';
import { Thirdparty } from 'app/our-third-party/thirdparty';
import { SelectReportsService } from 'app/select-reports/select-reports.service';
import { SelectReports } from 'app/select-reports/SelectReports';

@Component({
    selector: 'jhi-select-reports',
    templateUrl: './select-reports.component.html',
    styles: []
})
export class SelectReportsComponent implements OnInit {
    result: SelectReports[];

    constructor(private modalService: NgbModal, private selectReportService: SelectReportsService) {}

    ngOnInit() {
        this.selectReportService.getReports().subscribe(res => (this.result = res));
    }
}
