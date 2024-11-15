import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Response } from '@shareable/response.interceptor';
import {
  UserListingReqDto,
  UserListingResDto,
} from '@admin/modules/user/dto/user-listing.dto';

@Controller('user')
@ApiTags('User')
@ApiUnauthorizedResponse({
  description: 'When token expire or Unauthorized',
})
@ApiNotFoundResponse({
  description: 'when user not found',
})
// @ApiBearerAuth()
// @UseGuards(ModeratorGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('listing')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    description:
      'This api list all the user and datatable and index pagination for more information please check UserListingReqDto schema',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserListingResDto,
  })
  @Response(UserListingResDto)
  listing(@Query() query: UserListingReqDto) {
    return this.userService.listing(query);
  }
}
