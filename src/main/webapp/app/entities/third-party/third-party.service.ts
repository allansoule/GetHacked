import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IThirdParty } from 'app/shared/model/third-party.model';

type EntityResponseType = HttpResponse<IThirdParty>;
type EntityArrayResponseType = HttpResponse<IThirdParty[]>;

@Injectable({ providedIn: 'root' })
export class ThirdPartyService {
    public resourceUrl = SERVER_API_URL + 'api/third-parties';

    constructor(protected http: HttpClient) {}

    create(thirdParty: IThirdParty): Observable<EntityResponseType> {
        return this.http.post<IThirdParty>(this.resourceUrl, thirdParty, { observe: 'response' });
    }

    update(thirdParty: IThirdParty): Observable<EntityResponseType> {
        return this.http.put<IThirdParty>(this.resourceUrl, thirdParty, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IThirdParty>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IThirdParty[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
