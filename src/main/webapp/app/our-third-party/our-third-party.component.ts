import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OurThirdPartyService } from 'app/our-third-party/our-third-party.service';
import { Thirdparty } from 'app/our-third-party/thirdparty';

@Component({
    selector: 'jhi-our-third-party',
    templateUrl: './our-third-party.component.html',
    styles: []
})
export class OurThirdPartyComponent implements OnInit {
    result: Thirdparty[];
    ngOnInit() {
        this.thirdPartyService.getUsers().subscribe(res => (this.result = res));
    }
    constructor(private modalService: NgbModal, private thirdPartyService: OurThirdPartyService) {}
}
