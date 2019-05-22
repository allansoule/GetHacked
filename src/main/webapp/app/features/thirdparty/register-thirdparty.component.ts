import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GethackedService } from 'app/features/gethacked.service';

@Component({
    selector: 'jhi-register-request',
    templateUrl: './register-thirdparty.component.html',
    styles: []
})
export class RegisterThirdpartyComponent implements OnInit {
    onSubmit(form: NgForm) {
        console.log(form.value);
        return this.service.registerThirdParty(form.value);
    }
    ngOnInit() {}
    constructor(private service: GethackedService) {}
}
