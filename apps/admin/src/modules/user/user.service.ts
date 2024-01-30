import { Injectable } from '@nestjs/common';
import {UserRepository} from "@shareable/database/repository";
import {UpdateUserReqDto} from "./dto";
import {ApiException, ErrorCodes} from "@core/exception";
import {StatusEnum} from "@core/enum";
import {UserListingReqDto} from "@admin/modules/user/dto/user-listing.dto";
import {PaginationMetaDto} from "@shareable/dto";

@Injectable()
export class UserService {
    constructor(private readonly userEntity : UserRepository) { }

    findOne(id:number){
        return this.userEntity.getUser({id});
    }

    async listing(query: UserListingReqDto){
        const { skip, perPage, search, order } = query;
        const users = this.userEntity.createQueryBuilder('users');
        if (search) {
            users.where(function (q) {
                q.where('users.firstName ilike :firstName', { firstName: `%${search}%` })
                    .orWhere('users.lastName ilike :lastName', { lastName: `%${search}%` })
                    .orWhere('users.email ilike :email', { email: `%${search}%` });
            });
        }
        const [items, count] = await users.offset(skip).limit(perPage).orderBy('id', order).getManyAndCount();
        return {
            items: items,
            pagination: new PaginationMetaDto(query, count),
        };
    }

   async update(id:number,body:UpdateUserReqDto){
        const user = await this.userEntity.getUser(id);
       console.log(user)
        if(body.email){
            const isEmailTaken = await this.userEntity.isEmailTaken(body.email);
            if (isEmailTaken) {
                throw new ApiException(ErrorCodes.EmailTaken)
            }
        }
       Object.assign(user, body);
       return this.userEntity.save(user);
    }
    async remove(id: number) {
        const user = await this.userEntity.getUser(id);
        await this.userEntity.remove(user);
    }
    async updateStatus(id: number) {
        const user = await this.userEntity.getUser(id);
        user.status = user.status ? StatusEnum.InActive : StatusEnum.Active;
        return this.userEntity.save(user);
    }
}
