import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CreateRequest } from 'app/create-request/CreateRequest';
import { NgForm } from '@angular/forms';
import { Reports } from 'app/reports/reports';
import moment = require('moment');
import { Request } from 'app/shared/model/request.model';
import { IRequest } from 'app/shared/model/request.model';
import { Observable, Subscription } from 'rxjs';
import { Requests } from 'app/requests/requests';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    myJSONObject: Reports;
    modifiedJSON: string;
    request: Request;
    result: Request;
    constructor(private http: HttpClient) {}
    getRequestObject(id): Observable<Request> {
        return this.http.get<Request>(SERVER_API_URL + '/api/requests/' + id);
    }
    setReport(f: NgForm, idRequest: number) {
        this.myJSONObject = JSON.parse(JSON.stringify(f));
        this.myJSONObject.date = moment().local();
        this.getRequestObject(idRequest).subscribe(res => (this.result = res));
        this.myJSONObject.request = this.result;
        this.modifiedJSON = JSON.stringify(this.myJSONObject);
        this.http.post(SERVER_API_URL + '/api/reports', this.modifiedJSON, httpOptions).subscribe(
            () => {
                alert('Votre rapport a été envoyé !');
            },
            error => {
                console.log('Erreur ! : ' + error);
            }
        );
    }
}
