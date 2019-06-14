import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from 'app/reports/reports.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'app/shared/model/request.model';

@Component({
    selector: 'jhi-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['reports.css']
})
export class ReportsComponent implements OnInit {
    idRequest: number;
    result: Request;
    constructor(private service: ReportsService, private activatedRoute: ActivatedRoute) {}
    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.idRequest = params['id'];
        });
        this.service.getRequestDetail(this.idRequest).subscribe(res => (this.result = res));
    }
    onSubmit(form: NgForm) {
        this.service.setReport(form.value, this.idRequest);
    }
}
