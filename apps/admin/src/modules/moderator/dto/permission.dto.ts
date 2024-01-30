import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsObject, IsOptional} from 'class-validator';
import {Expose} from 'class-transformer';

class CrudClass {
    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    create?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    view?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    edit: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    delete?: boolean;
}

export class PermissionDto {
    @Expose()
    @IsObject()
    @ApiProperty({
        type: CrudClass,
    })
    dashboard: CrudClass;

    @Expose()
    @IsObject()
    @ApiProperty({
        type: CrudClass,
    })
    moderators: CrudClass;

    @Expose()
    @IsObject()
    @ApiProperty({
        type: CrudClass,
    })
    contents: CrudClass;
}
