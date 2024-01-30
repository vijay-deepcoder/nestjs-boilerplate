import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsEnum, IsOptional, IsString} from 'class-validator';
import {OrderByEnum} from '@shareable/enum';
import {PaginationReqDto, PaginationResDto} from '@shareable/dto';
import {Expose, Type} from 'class-transformer';
import {ModeratorResDto} from './moderator-res.dto';

export class ModeratorListingReqDto extends PaginationReqDto {
    @ApiPropertyOptional({enum: OrderByEnum, default: OrderByEnum.asc})
    @IsEnum(OrderByEnum)
    @IsOptional()
    readonly orderBy?: OrderByEnum = OrderByEnum.asc;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    search?: string;
}

export class ModeratorListingResDto {
    @Expose()
    @Type(() => ModeratorResDto)
    @ApiProperty({
        type: [ModeratorResDto],
    })
    items: ModeratorResDto[];

    @Expose()
    @ApiProperty({
        type: PaginationResDto,
    })
    @Type(() => PaginationResDto)
    pagination: PaginationResDto;
}