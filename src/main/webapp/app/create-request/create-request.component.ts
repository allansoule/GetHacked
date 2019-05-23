import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CreateRequestService } from 'app/create-request/create-request.service';

@Component({
    selector: 'jhi-create-request',
    templateUrl: './create-request.component.html',
    styleUrls: ['create-request.css']
})
export class CreateRequestComponent implements OnInit {
    onSubmit(form: NgForm) {
        return this.service.setRequests(form.value);
    }
    ngOnInit() {}
    constructor(private service: CreateRequestService) {}
}
