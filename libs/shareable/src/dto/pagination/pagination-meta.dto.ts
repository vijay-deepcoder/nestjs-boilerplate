import { ApiProperty } from '@nestjs/swagger';

export interface PageMetaDtoParameters {
	pageOptionsDto: any;
	itemCount: number;
}

export class PaginationMetaDto {
	@ApiProperty()
	readonly page: number;

	@ApiProperty()
	readonly take: number;

	@ApiProperty()
	readonly itemCount: number;

	@ApiProperty()
	readonly pageCount: number;

	@ApiProperty()
	readonly hasPreviousPage: boolean;

	@ApiProperty()
	readonly hasNextPage: boolean;

	constructor(pageOptionsDto: any, itemCount: number) {
		this.page = pageOptionsDto.page;
		this.take = pageOptionsDto.perPage;
		this.itemCount = itemCount;
		this.pageCount = Math.ceil(this.itemCount / this.take);
		this.hasPreviousPage = this.page > 1;
		this.hasNextPage = this.page < this.pageCount;
	}
}
