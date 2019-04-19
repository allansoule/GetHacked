import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CreateRequest } from 'app/create-request/CreateRequest';
import { NgForm } from '@angular/forms';
import moment = require('moment');

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    myJSONObject: CreateRequest;
    receivedJSON: JSON;
    modifiedJSON: string;
    constructor(private http: HttpClient) {}
    setReport(f: NgForm) {
        this.myJSONObject = JSON.parse(JSON.stringify(f));
        this.myJSONObject.date = moment().local();
        this.modifiedJSON = JSON.stringify(this.myJSONObject);
        this.http.post(SERVER_API_URL + '/api/reports', this.modifiedJSON, httpOptions).subscribe(
            () => {
                alert('Votre report a été ajoutée !');
            },
            error => {
                console.log('Erreur ! : ' + error);
            }
        );
    }
}
