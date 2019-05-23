import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IRequest } from 'app/shared/model/request.model';
import { HttpHeaders } from '@angular/common/http';
import { CreateRequest } from 'app/create-request/CreateRequest';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { Moment } from 'moment';
import moment = require('moment');

export interface RegisterThirdPartyRequestDTO {
    name: string;
    socialReason: string;
    ownerToAdd: string;
}

export interface RegisterThirdPartyResponseDTO {
    id: number;
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class GethackedService {
    public resourceUrl = SERVER_API_URL + 'api/gethacked';
    constructor(private http: HttpClient) {}
    registerThirdParty(req: RegisterThirdPartyRequestDTO): Observable<HttpResponse<RegisterThirdPartyResponseDTO>> {
        return this.http.post<RegisterThirdPartyResponseDTO>(this.resourceUrl + '/register-thirdparty', req, { observe: 'response' });
    }
}
