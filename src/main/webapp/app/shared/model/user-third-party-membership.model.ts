import { IUser } from 'app/core/user/user.model';
import { IThirdParty } from 'app/shared/model/third-party.model';

export interface IUserThirdPartyMembership {
    id?: number;
    type?: string;
    user?: IUser;
    thirdParty?: IThirdParty;
}

export class UserThirdPartyMembership implements IUserThirdPartyMembership {
    constructor(public id?: number, public type?: string, public user?: IUser, public thirdParty?: IThirdParty) {}
}
