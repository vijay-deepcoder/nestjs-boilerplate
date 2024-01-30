import {Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {UserEnum} from '@core/enum';
import {PermissionDto} from '@admin/modules/moderator/dto';


class User {
    @Expose()
    @ApiProperty()
    id: string

    @Expose()
    @ApiProperty()
    firstName: string

    @Expose()
    @ApiProperty()
    lastName: string

    @Expose()
    @ApiProperty()
    profileImageUri: string | null

    @Expose()
    @ApiProperty()
    email: string

    @Expose()
    @ApiProperty({
        enum: UserEnum,
    })
    type: UserEnum

    @Expose()
    @ApiProperty({
        type: PermissionDto
    })
    @Type(() => PermissionDto)
    permissions: PermissionDto | null;
}

export class LoginResDto {
    @Expose()
    @ApiProperty({
        type: User,
    })
    @Type(() => User)
    user: User;

    @Expose()
    @ApiProperty()
    token: string;
}