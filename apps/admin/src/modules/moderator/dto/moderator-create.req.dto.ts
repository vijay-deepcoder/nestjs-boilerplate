import {IsEmail, IsNotEmptyObject, IsObject, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {PermissionDto} from './permission.dto';
import {IsNotBlank} from '@core/decorators/is-not-blank.decorator';

export class ModeratorCreateReqDto {
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

    @IsString()
    @Length(3, 100)
    @IsNotBlank()
    @ApiProperty({
        example: '123456',
    })
    password: string;

    @IsObject()
    @ApiProperty({
        type: PermissionDto,
    })
    @IsNotEmptyObject()
    permissions: PermissionDto;
}
