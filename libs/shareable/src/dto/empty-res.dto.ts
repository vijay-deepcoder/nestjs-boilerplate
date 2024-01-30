import {Expose} from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class EmptyResDto {
    @Expose()
    @ApiProperty({
        example: false,
    })
    isError: boolean;

    @Expose()
    @ApiProperty({
        example: '',
        default: '',
    })
    message: string;

    @Expose()
    @ApiProperty({
        example: {},
    })
    data: object;
}
