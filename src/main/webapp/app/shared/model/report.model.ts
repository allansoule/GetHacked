import { Moment } from 'moment';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { IRequest } from 'app/shared/model/request.model';

export interface IReport {
    id?: number;
    title?: string;
    date?: Moment;
    body?: string;
    thirdParty?: IThirdParty;
    request?: IRequest;
}

export class Report implements IReport {
    constructor(
        public id?: number,
        public title?: string,
        public date?: Moment,
        public body?: string,
        public thirdParty?: IThirdParty,
        public request?: IRequest
    ) {}
}
