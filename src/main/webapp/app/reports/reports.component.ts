import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReportsService } from 'app/reports/reports.component.service';

@Component({
    selector: 'jhi-reports',
    templateUrl: './reports.component.html',
    styles: []
})
export class ReportsComponent implements OnInit {
    onSubmit(form: NgForm) {
        this.service.setReport(form.value);
    }
    constructor(private service: ReportsService) {}

    ngOnInit() {}
}
