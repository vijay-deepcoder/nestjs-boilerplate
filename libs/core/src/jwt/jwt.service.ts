import {Injectable} from '@nestjs/common/decorators';
import {JwtService as JwtNestService} from '@nestjs/jwt';
import {ApiException, ErrorCodes} from '@core/exception';
import {ConfigService} from '@nestjs/config';
import {Request} from 'express';
import {getTokenFromHeader} from '@core/utility';
import {JwtInterface} from '../../../../apps/admin/src/interface';


@Injectable()
export class JwtService {
    constructor(private tokenService: JwtNestService, private config: ConfigService) {
    }

    token(data: any) {
        try {
            return this.tokenService.signAsync(data, {secret: this.getConfigSecret()});
        } catch (e) {
            throw new ApiException(ErrorCodes.TokenExpire);
        }
    }

    async decode(token: string): Promise<any> {
        try {
            return await this.tokenService.verifyAsync(token, {secret: this.getConfigSecret()});
        } catch (e) {
            throw new ApiException(ErrorCodes.TokenExpire);
        }
    }

    async decodeFromHeader(request: Request, isGuest: boolean = false): undefined | Promise<JwtInterface> {
        const token = getTokenFromHeader(request);
        if (token) {
            return this.decode(token);
        }
        if (!isGuest) {
            throw new ApiException(ErrorCodes.LoginRequired);
        }
        return undefined;
    }

    protected getConfigSecret(): string {
        return this.config.getOrThrow<string>('tokens.jwt.secret');
    }

}

