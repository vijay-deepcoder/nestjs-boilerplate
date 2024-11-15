import { Injectable } from '@nestjs/common';

import { HashService } from '@shareable/hashing/hash.service';
import { JwtService } from '@shareable/jwt/jwt.service';
import { ApiException, ErrorCodes } from 'libs/shareable/src/exception';
import { UserEnum } from '@shareable/enum';
import { LoginReqDto } from './dtos';
import { ModeratorRepository } from '@shareable/database/repository';

@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private moderator: ModeratorRepository,
  ) {}

  async login(body: LoginReqDto) {
    const moderator = await this.moderator.findOneBy({ email: body.email });
    if (moderator) {
      moderator.isActiveCheck();
      const passwordMatched = await this.hashService.compare(
        body.password,
        moderator.password,
      );
      if (passwordMatched) {
        return {
          user: moderator,
          token: await this.jwtService.token({
            id: moderator.id,
            for: UserEnum.moderator,
          }),
        };
      }
    }
    throw new ApiException(ErrorCodes.BadRequest);
  }

  forgotPassword() {
    return 'forgot password';
  }

  resetPassword() {
    return 'reset password';
  }
}
