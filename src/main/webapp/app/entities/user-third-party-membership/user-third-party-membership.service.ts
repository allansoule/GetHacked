import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';

type EntityResponseType = HttpResponse<IUserThirdPartyMembership>;
type EntityArrayResponseType = HttpResponse<IUserThirdPartyMembership[]>;

@Injectable({ providedIn: 'root' })
export class UserThirdPartyMembershipService {
    public resourceUrl = SERVER_API_URL + 'api/user-third-party-memberships';

    constructor(protected http: HttpClient) {}

    create(userThirdPartyMembership: IUserThirdPartyMembership): Observable<EntityResponseType> {
        return this.http.post<IUserThirdPartyMembership>(this.resourceUrl, userThirdPartyMembership, { observe: 'response' });
    }

    update(userThirdPartyMembership: IUserThirdPartyMembership): Observable<EntityResponseType> {
        return this.http.put<IUserThirdPartyMembership>(this.resourceUrl, userThirdPartyMembership, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserThirdPartyMembership>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserThirdPartyMembership[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
