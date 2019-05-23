import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from 'app/reports/reports.component.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-reports',
    templateUrl: './reports.component.html',
    styles: []
})
export class ReportsComponent implements OnInit {
    idRequest: number;
    onSubmit(form: NgForm) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.idRequest = params['id'];
        });
        console.log(this.idRequest);
        this.service.setReport(form.value, this.idRequest);
    }
    ngOnInit() {}

    constructor(private service: ReportsService, private activatedRoute: ActivatedRoute) {}
}
