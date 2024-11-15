import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthTypeEnum } from '@shareable/enum/auth-type.enum';
import { Reflector } from '@nestjs/core';
import { UserEnum } from '@shareable/enum';
import { ApiException, ErrorCodes } from 'libs/shareable/src/exception';
import { JwtInterface } from '../interface';
import { JwtService } from '@shareable/jwt/jwt.service';
import { ModeratorRepository } from '@shareable/database/repository';

@Injectable()
export class ModeratorGuard implements CanActivate {
  private readonly defaultAuthType = AuthTypeEnum.Bearer;

  constructor(
    private reflector: Reflector,
    private readonly tokenService: JwtService,
    private readonly moderatorRepository: ModeratorRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const guards = this.reflector.getAllAndOverride('authType', [
      context.getHandler(),
      context.getClass(),
    ]) ?? [this.defaultAuthType];
    for (const guard of guards as AuthTypeEnum[]) {
      if (guard === AuthTypeEnum.Bearer) {
        return this.BearerValidation(context);
      }
    }
    return true;
  }

  protected async BearerValidation(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const decode: JwtInterface = await this.tokenService.decodeFromHeader(
      request,
    );
    if (decode.for == UserEnum.moderator) {
      const user = await this.moderatorRepository.findOneBy({ id: decode.id });
      if (user) {
        user.isActiveCheck();
        request.moderator = user;
        return true;
      }
    }
    throw new ApiException(ErrorCodes.LoginRequired);
  }
}
