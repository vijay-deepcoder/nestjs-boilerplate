import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ModeratorService } from './moderator.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { HttpCode, Post, UseGuards } from '@nestjs/common/decorators';
import {
  ModeratorCreateReqDto,
  ModeratorListingReqDto,
  ModeratorListingResDto,
  ModeratorResDto,
  ModeratorUpdateDtoReq,
} from './dto';
import { ModeratorGuard } from '../../gaurds/moderator.guard';

import { Moderator } from '../../decoraters/moderator.decorator';
import { Response } from '@shareable/response.interceptor';
import { ModeratorEntity } from '@shareable/database/entities';
import { EmptyResDto } from '@shareable/dto';

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
  constructor(private readonly moderatorService: ModeratorService) {}

  @Get('listing')
  @UsePipes(new ValidationPipe({ transform: true }))
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
    @Query() query: ModeratorListingReqDto,
  ) {
    return this.moderatorService.listing(user, query);
  }

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ModeratorResDto,
  })
  @ApiResponse({
    description:
      'for more information please check ModeratorCreateReqDto schema',
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
  updateStatus(@Param() id: string) {
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
    description:
      'for more information please check ModeratorUpdateDtoReq schema',
  })
  edit(
    @Param() id: string,
    @Moderator() moderator: ModeratorEntity,
    @Body() body: ModeratorUpdateDtoReq,
  ) {
    return this.moderatorService.updateModerator(id, moderator, body);
  }

  @Get('/:id/detail')
  @Response(ModeratorResDto)
  @ApiOkResponse({
    type: ModeratorResDto,
  })
  @HttpCode(HttpStatus.OK)
  detail(@Param() id: string) {
    return this.moderatorService.getDetails(id);
  }

  //
  @Response()
  @ApiOkResponse({
    type: EmptyResDto,
  })
  @ApiBadRequestResponse({
    description: 'when user try to delete own account',
  })
  @Delete(':id/delete')
  delete(@Moderator() moderator: ModeratorEntity, @Param() id: string) {
    return this.moderatorService.delete(moderator, id);
  }
}
