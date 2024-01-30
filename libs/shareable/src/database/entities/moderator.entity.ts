import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import {StatusEnum, UserEnum} from '@core/enum';
import {ApiException, ErrorCodes} from '@core/exception';
import {PermissionDto} from '@admin/modules/moderator/dto';


@Entity({
    name: 'moderators',
})
export class ModeratorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
        name: 'first_name',
    })
    @Index()
    firstName: string;

    @Column({
        nullable: true,
        name: 'last_name',
    })
    @Index()
    lastName: string;

    @Column({
        nullable: true,
        name: 'profile_image',
    })
    @Index()
    profileImage?: string | null;

    @Column()
    @Index()
    email: string;

    @Column()
    password: string;

    @Column({
        enum: StatusEnum,
        type: 'enum',
        default: StatusEnum.Active,
    })
    status: number;

    @Column({
        enum: UserEnum,
        type: 'enum',
        default: UserEnum.moderator,
    })
    type: UserEnum;

    @Column({
        type: 'jsonb',
        nullable: true,
    })
    permissions: PermissionDto;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    get profileImageUri() {
        return this.profileImage;
    }

    isActiveCheck() {
        if (this.status == StatusEnum.InActive) {
            throw new ApiException(ErrorCodes.AccountBan);
        }
    }
}
