import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThirdParty } from 'app/shared/model/third-party.model';

@Component({
    selector: 'jhi-third-party-detail',
    templateUrl: './third-party-detail.component.html'
})
export class ThirdPartyDetailComponent implements OnInit {
    thirdParty: IThirdParty;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ thirdParty }) => {
            this.thirdParty = thirdParty;
        });
    }

    previousState() {
        window.history.back();
    }
}
