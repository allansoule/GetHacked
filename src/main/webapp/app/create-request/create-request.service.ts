import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
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

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class CreateRequestService {
    myJSONObject: CreateRequest;
    receivedJSON: JSON;
    modifiedJSON: string;
    constructor(private http: HttpClient) {}
    setRequests(f: NgForm) {
        this.myJSONObject = JSON.parse(JSON.stringify(f));
        this.myJSONObject.date = moment().local();
        this.modifiedJSON = JSON.stringify(this.myJSONObject);
        this.http.post(SERVER_API_URL + '/api/requests', this.modifiedJSON, httpOptions).subscribe(
            () => {
                return true;
            },
            error => {
                console.log('Erreur ! : ' + error);
                return false;
            }
        );
    }
}
