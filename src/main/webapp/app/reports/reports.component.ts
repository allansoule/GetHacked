import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from 'app/reports/reports.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'app/shared/model/request.model';

@Component({
    selector: 'jhi-reports',
    templateUrl: './reports.component.html',
    styles: []
})
export class ReportsComponent implements OnInit {
    idRequest: number;
    result: Request;
    onSubmit(form: NgForm) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.idRequest = params['id'];
        });
        this.service.setReport(form.value, this.idRequest);
    }
    ngOnInit() {}
    constructor(private service: ReportsService, private activatedRoute: ActivatedRoute) {}
}
