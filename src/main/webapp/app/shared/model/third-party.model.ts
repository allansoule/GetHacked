import { IUserThirdPartyMembership } from 'app/shared/model/user-third-party-membership.model';
import { IReport } from 'app/shared/model/report.model';
import { IRequest } from 'app/shared/model/request.model';

export interface IThirdParty {
    id?: number;
    name?: string;
    userThirdPartyMemberships?: IUserThirdPartyMembership[];
    reports?: IReport[];
    requests?: IRequest[];
}

export class ThirdParty implements IThirdParty {
    constructor(
        public id?: number,
        public name?: string,
        public userThirdPartyMemberships?: IUserThirdPartyMembership[],
        public reports?: IReport[],
        public requests?: IRequest[]
    ) {}
}
