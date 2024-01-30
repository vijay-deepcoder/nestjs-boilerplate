import {IsEmail, IsNotEmptyObject, IsObject, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

import {PermissionDto} from './permission.dto';
import {IsNotBlank} from '@core/decorators/is-not-blank.decorator';

export class ModeratorUpdateDtoReq {
    @IsString()
    @IsNotBlank()
    @Length(3, 100)
    @ApiProperty({
        example: 'john',
    })
    firstName: string;

    @IsString()
    @IsNotBlank()
    @Length(3, 100)
    @ApiProperty({
        example: 'doe',
    })
    lastName: string;

    @IsEmail()
    @Length(3, 100)
    @ApiProperty({
        example: 'john@doe.com',
    })
    email: string;

    @IsObject()
    @IsNotEmptyObject()
    @ApiProperty({
        type: PermissionDto,
    })
    permissions: PermissionDto;
}
