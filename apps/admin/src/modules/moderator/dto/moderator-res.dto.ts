import {StatusEnum} from '@core/enum';
import {Expose, Type} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';
import {PermissionDto} from './permission.dto';

export class ModeratorResDto {
    @Expose()
    @ApiProperty()
    id: number;

    @Expose()
    @ApiProperty()
    firstName: string;

    @Expose()
    @ApiProperty()
    lastName: string;

    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    profileImageUri: string | null;

    @Expose()
    @ApiProperty({
        enum: StatusEnum,
    })
    status: StatusEnum;

    @Expose()
    @ApiProperty({
        type: Date
    })
    createdAt: Date;

    @Expose()
    @ApiProperty({
        type: Date
    })
    updatedAt: Date;

    @Expose()
    @ApiProperty({
        type: PermissionDto,
    })
    @Type(() => PermissionDto)
    permissions: PermissionDto;
}
