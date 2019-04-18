import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OurThirdPartyService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<any> {
        return this.http.get(SERVER_API_URL + '/api/third-parties');
    }
}
