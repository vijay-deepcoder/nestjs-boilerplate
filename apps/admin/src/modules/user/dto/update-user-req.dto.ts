import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator';

export class UpdateUserReqDto {
    @ApiProperty({
        example: 'john'
    })

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    firstName: string

    @ApiProperty({
        example: 'dev'
    })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName: string

    @ApiProperty({
        example: 'johndev@gmail.com'
    })
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @IsEmail()
    @MaxLength(255)
    email: string

}