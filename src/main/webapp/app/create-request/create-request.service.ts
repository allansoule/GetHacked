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

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'
})
export class CreateRequestService {
    account: Account;
    constructor(private http: HttpClient, private accountService) {}
    setRequests(f: NgForm) {
        this.http.post(SERVER_API_URL + '/api/requests', JSON.stringify(f), httpOptions).subscribe(
            () => {
                console.log('Enregistrement terminé !');
            },
            error => {
                console.log('Erreur ! : ' + error);
            }
        );
    }
    getCurrentLogin() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
    }
}
