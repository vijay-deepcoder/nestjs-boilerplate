import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {ModeratorService} from './moderator.service';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {HttpCode, Post, UseGuards} from '@nestjs/common/decorators';
import {
    ModeratorCreateReqDto,
    ModeratorListingReqDto,
    ModeratorListingResDto,
    ModeratorResDto,
    ModeratorUpdateDtoReq
} from './dto';
import {ModeratorGuard} from '../../gaurds/moderator.guard';

import {Moderator} from '../../decoraters/moderator.decorator';
import {Response} from '@core/response.interceptor';
import {ModeratorEntity} from '@shareable/database/entities';
import {EmptyResDto} from '@shareable/dto';

@ApiTags('Moderator')
@Controller('moderator')
@ApiUnauthorizedResponse({
    description: 'When token expire or Unauthorized',
})
@ApiNotFoundResponse({
    description: 'when moderator not found',
})
@ApiBearerAuth()
@UseGuards(ModeratorGuard)
export class ModeratorController {
    constructor(private readonly moderatorService: ModeratorService) {
    }

    @Get('listing')
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiResponse({
        description:
            'This api list all the moderator and datatable and index pagination for more information please check ModeratorListingReqDto schema',
    })
    @ApiOkResponse({
        type: ModeratorListingResDto,
    })
    @Response(ModeratorListingResDto)
    listing(
        @Moderator() user: ModeratorEntity,
        @Query() query: ModeratorListingReqDto
    ) {
        return this.moderatorService.listing(user, query);
    }


    @Post('create')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ModeratorResDto,
    })
    @ApiResponse({
        description: 'for more information please check ModeratorCreateReqDto schema',
    })
    @ApiBadRequestResponse({
        description: 'user email is taken',
    })
    @Response(ModeratorResDto)
    create(@Body() body: ModeratorCreateReqDto) {
        return this.moderatorService.createModerator(body);
    }

    @Response(ModeratorResDto)
    @ApiOkResponse({
        type: ModeratorResDto,
    })
    @Patch(':id/update-status')
    updateStatus(@Param('id', ParseIntPipe) id: number) {
        return this.moderatorService.updateStatus(id);
    }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        type: ModeratorResDto,
    })
    @ApiBadRequestResponse({
        description: 'user email is taken or user try to edit own account',
    })
    @Response(ModeratorResDto)
    @Patch('/:id/update')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        description: 'for more information please check ModeratorUpdateDtoReq schema',
    })
    edit(
        @Param('id', ParseIntPipe) id: number,
        @Moderator() moderator: ModeratorEntity,
        @Body() body: ModeratorUpdateDtoReq
    ) {
        return this.moderatorService.updateModerator(id, moderator, body);
    }

    @Get('/:id/detail')
    @Response(ModeratorResDto)
    @ApiOkResponse({
        type: ModeratorResDto,
    })
    @HttpCode(HttpStatus.OK)
    detail(@Param('id', ParseIntPipe) id: number) {
        return this.moderatorService.getDetails(id);
    }

    //
    @Response()
    @ApiOkResponse({
        type: EmptyResDto,
    })
    @ApiBadRequestResponse({
        description: "when user try to delete own account"
    })
    @Delete(':id/delete')
    delete(
        @Moderator() moderator: ModeratorEntity,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.moderatorService.delete(moderator, id);
    }

    // @Post(':id/profile-image/s3-upload-url')
    // @ApiOkResponse({
    // 	type: S3SignUrlResDto,
    // })
    // @HttpCode(HttpStatus.OK)
    // @Serialize(S3SignUrlResDto)
    // @ApiResponse({
    // 	description: 'For more information please check UploadImageS3FileReqDto',
    // })
    // getUploadUrl(@Param('id', ParseIntPipe) id: number, @Body() body: UploadImageS3FileReqDto) {
    // 	return this.moderatorService.getS3UploadUrl(id, body.mimeType);
    // }
    //
    // @ApiOkResponse({
    // 	type: ModeratorResDto,
    // })
    // @HttpCode(HttpStatus.OK)
    // @Serialize(ModeratorResDto)
    // @ApiResponse({
    // 	description: 'For more information please check UploadedFileS3ReqDto',
    // })
    // @Post(':id/profile-image/update')
    // updateProfileImage(@Param('id', ParseIntPipe) id: number, @Body() body: UploadedFileS3ReqDto) {
    // 	return this.moderatorService.updateProfileImage(id, body);
    // }
}
