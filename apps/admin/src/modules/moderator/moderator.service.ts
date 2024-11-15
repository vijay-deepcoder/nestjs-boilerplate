import { Injectable } from '@nestjs/common';
import {
  ModeratorCreateReqDto,
  ModeratorListingReqDto,
  ModeratorUpdateDtoReq,
} from './dto';
import { ModeratorRepository } from '@shareable/database/repository';
import { HashService } from '@shareable/hashing/hash.service';
import { ModeratorEntity } from '@shareable/database/entities';
import { ApiException, ErrorCodes } from 'libs/shareable/src/exception';
import { StatusEnum, UserEnum } from '@shareable/enum';
import { PaginationMetaDto } from '@shareable/dto/pagination/pagination-meta.dto';

@Injectable()
export class ModeratorService {
  constructor(
    private readonly moderatorRepository: ModeratorRepository,
    private readonly hashService: HashService, // private readonly awsS3Utility: AwsS3Utility,
  ) {}

  async createModerator(body: ModeratorCreateReqDto) {
    const isEmailTaken = await this.moderatorRepository.isUniqueMail(
      body.email,
    );
    if (isEmailTaken) {
      throw new ApiException(ErrorCodes.EmailTaken);
    }
    const moderator: ModeratorEntity = this.moderatorRepository.create({
      ...body,
      password: await this.hashService.hash(body.password),
    });
    return this.moderatorRepository.save(moderator);
  }

  async listing(user: ModeratorEntity, pageOptionsDto: ModeratorListingReqDto) {
    const { skip, perPage, search, orderBy } = pageOptionsDto;
    const users = this.moderatorRepository
      .createQueryBuilder('mod')
      .limit(perPage)
      .offset(skip)
      .orderBy('mod.id', orderBy)
      .where('mod.type=:Type');
    // .andWhere('mod.id!=:Id');
    if (search) {
      users.andWhere(
        '(mod.firstName ilike :search or mod.lastName ilike :search or mod.email ilike :search)',
      );
    }

    const [items, count] = await users
      .setParameters({
        Id: user.id,
        search: `%${search}%`,
        Type: UserEnum.moderator,
      })
      .getManyAndCount();
    return {
      items: items,
      pagination: new PaginationMetaDto(pageOptionsDto, count),
    };
  }

  async getDetails(id: string): Promise<ModeratorEntity> {
    return this.getModerator(id);
  }

  async updateModerator(
    id: string,
    moderator: ModeratorEntity,
    body: ModeratorUpdateDtoReq,
  ) {
    const isEmailTaken = await this.moderatorRepository.isUniqueMail(
      body.email,
      id,
    );
    if (!isEmailTaken) {
      if (id != moderator.id) {
        const moderator = await this.getModerator(id);
        Object.assign(moderator, body);
        return await this.moderatorRepository.save(moderator);
      }
      throw new ApiException(ErrorCodes.BadRequest);
    }
    throw new ApiException(ErrorCodes.EmailTaken);
  }

  async delete(user: ModeratorEntity, id: string) {
    if (user.id == id) {
      throw new ApiException(ErrorCodes.BadRequest);
    }
    const moderator = await this.getModerator(id);
    return this.moderatorRepository.remove(moderator);
  }

  async updateStatus(id: string) {
    const moderator = await this.getModerator(id);
    moderator.status = moderator.status
      ? StatusEnum.InActive
      : StatusEnum.Active;
    return this.moderatorRepository.save(moderator);
  }

  protected getModerator(id: string): Promise<ModeratorEntity> {
    return this.moderatorRepository.findOneByOrFail({
      id,
      type: UserEnum.moderator,
    });
  }
}
