import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shareable/database/repository';
import { UserListingReqDto } from '@admin/modules/user/dto/user-listing.dto';
import { PaginationMetaDto } from '@shareable/dto';

@Injectable()
export class UserService {
  constructor(private readonly userEntity: UserRepository) {}

  async listing(query: UserListingReqDto) {
    const { skip, perPage, search, orderBy } = query;
    const users = this.userEntity.createQueryBuilder('users');
    if (search) {
      users.where(function (q) {
        q.where('users.firstName ilike :firstName', {
          firstName: `%${search}%`,
        })
          .orWhere('users.lastName ilike :lastName', {
            lastName: `%${search}%`,
          })
          .orWhere('users.email ilike :email', { email: `%${search}%` });
      });
    }
    const [items, count] = await users
      .offset(skip)
      .limit(perPage)
      .orderBy('id', orderBy)
      .getManyAndCount();
    return {
      items: items,
      pagination: new PaginationMetaDto(query, count),
    };
  }
}
