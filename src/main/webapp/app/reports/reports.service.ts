import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Reports } from 'app/reports/reports';
import moment = require('moment');
import { Request } from 'app/shared/model/request.model';
import { Observable } from 'rxjs';

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
    setReport(f: NgForm, idRequest: number) {
        this.myJSONObject = JSON.parse(JSON.stringify(f));
        this.myJSONObject.date = moment().local();
        this.modifiedJSON = JSON.stringify(this.myJSONObject);
        this.http.post(SERVER_API_URL + '/api/reports/' + idRequest, this.modifiedJSON, httpOptions).subscribe(
            () => {
                alert('Votre rapport a été envoyé !');
            },
            error => {
                console.log('Erreur ! : ' + error);
            }
        );
    }
    getRequestDetail(id): Observable<any> {
        return this.http.get(SERVER_API_URL + '/api/requests/' + id);
    }
}
