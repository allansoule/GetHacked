import { Moment } from 'moment';
import { IRequest } from 'app/shared/model/request.model';

export class Reports {
    id: number;
    title: string;
    body: string;
    reportFile: number[];
    date?: Moment;
    request: IRequest;
}
