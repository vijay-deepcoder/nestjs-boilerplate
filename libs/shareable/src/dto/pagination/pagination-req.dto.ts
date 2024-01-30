import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationReqDto {
	@ApiProperty({
		minimum: 1,
		default: 1,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiProperty({
		minimum: 1,
		maximum: 5000,
		default: 10,
	})
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(5000)
	readonly perPage?: number = 10;

	get skip(): number {
		return (this.page - 1) * this.perPage;
	}
}
