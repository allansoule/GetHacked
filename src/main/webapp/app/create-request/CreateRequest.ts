import { Moment } from 'moment';
import { IThirdParty } from 'app/shared/model/third-party.model';
import { IReport } from 'app/shared/model/report.model';

export class CreateRequest {
    id?: number;
    title?: string;
    pricing?: string;
    description?: string;
    date?: Moment;
    scope?: string;
    thirdParty?: IThirdParty;
    reports?: IReport[];
}
