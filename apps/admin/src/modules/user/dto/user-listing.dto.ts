import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsOptional, IsString} from 'class-validator';
import {OrderByEnum} from '@shareable/enum';
import {PaginationReqDto, PaginationResDto} from '@shareable/dto';
import {Expose, Type} from 'class-transformer';
import {UserResDto} from "@admin/modules/user/dto/user-res.dto";

export class UserListingReqDto extends PaginationReqDto {
    @ApiPropertyOptional({enum: OrderByEnum, default: OrderByEnum.asc})
    @IsEnum(OrderByEnum)
    @IsOptional()
    readonly orderBy?: OrderByEnum = OrderByEnum.asc;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    search?: string;
}

export class UserListingResDto {
    @Expose()
    @Type(() => UserResDto)
    @ApiProperty({
        type: [UserResDto],
    })
    items: UserResDto[];

    @Expose()
    @ApiProperty({
        type: PaginationResDto,
    })
    @Type(() => PaginationResDto)
    pagination: PaginationResDto;
}