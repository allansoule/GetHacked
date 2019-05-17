import { IReport, Report } from 'app/shared/model/report.model';

export class Requests {
    id: number;
    title: string;
    description: string;
    pricing: string;
    scope: string;
    thirdparty: number;
    reports: IReport;
}
