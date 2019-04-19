import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateRequestService } from 'app/create-request/create-request.service';
import { OurThirdPartyService } from 'app/our-third-party/our-third-party.service';

@Component({
    selector: 'jhi-create-request',
    templateUrl: './create-request.component.html',
    styles: []
})
export class CreateRequestComponent implements OnInit {
    onSubmit(form: NgForm) {
        this.service.setRequests(form.value);
    }
    ngOnInit() {}
    constructor(private service: CreateRequestService) {}
}
