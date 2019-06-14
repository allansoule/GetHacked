import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { SearchCriteriaDTO } from 'app/requests/SearchCriteriaDTO';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    requests: Object;
    constructor(private http: HttpClient) {}

    getRequests(): Observable<any> {
        return this.http.get(SERVER_API_URL + '/api/requests');
    }

    searchRequest(query: SearchCriteriaDTO): Observable<any> {
        return this.http.post(SERVER_API_URL + '/api/requests/search', query);
    }
}
