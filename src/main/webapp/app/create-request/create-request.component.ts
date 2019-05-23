import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateRequestService } from 'app/create-request/create-request.service';
import { JhiAlertErrorComponent } from 'app/shared';
import { JhiAlertComponent } from 'app/shared';
import { OurThirdPartyService } from 'app/our-third-party/our-third-party.service';
import { JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-create-request',
    templateUrl: './create-request.component.html',
    styles: []
})
export class CreateRequestComponent implements OnInit {
    onSubmit(form: NgForm) {
        return this.service.setRequests(form.value);
    }
    ngOnInit() {}
    constructor(private service: CreateRequestService) {}
}
