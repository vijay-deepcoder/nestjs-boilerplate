import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString} from 'class-validator';

export class LoginReqDto {
    @ApiProperty({
        example: "admin@gmail.com"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123456"
    })
    @IsString()
    password: string;
}