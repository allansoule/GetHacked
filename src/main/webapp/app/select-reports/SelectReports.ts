import { Moment } from 'moment';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { IRequest } from 'app/shared/model/request.model';

export class SelectReports {
    id?: number;
    title?: string;
    date?: Moment;
    body?: string;
    thirdParty?: IThirdParty;
    request?: IRequest;
}
