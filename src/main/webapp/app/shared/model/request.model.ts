import { Moment } from 'moment';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { IReport } from 'app/shared/model/report.model';

export interface IRequest {
    id?: number;
    title?: string;
    pricing?: string;
    description?: string;
    date?: Moment;
    scope?: string;
    thirdParty?: IThirdParty;
    reports?: IReport[];
}

export class Request implements IRequest {
    constructor(
        public id?: number,
        public title?: string,
        public pricing?: string,
        public description?: string,
        public date?: Moment,
        public scope?: string,
        public thirdParty?: IThirdParty,
        public reports?: IReport[]
    ) {}
}
