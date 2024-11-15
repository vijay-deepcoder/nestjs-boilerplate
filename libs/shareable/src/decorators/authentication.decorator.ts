import {SetMetadata} from '@nestjs/common';
import {AuthTypeEnum} from '@shareable/enum/auth-type.enum';


export const AuthTypeKey = 'authType';

export const Authentication = (...authTypes: AuthTypeEnum[]) => SetMetadata(AuthTypeKey, authTypes);
