import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode, HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import {UpdateUserReqDto, UserResDto} from "./dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import {Response} from "@core/response.interceptor";
import {UserListingReqDto, UserListingResDto} from "@admin/modules/user/dto/user-listing.dto";
import {ModeratorGuard} from "@admin/gaurds/moderator.guard";

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
  @UsePipes(new ValidationPipe({transform: true}))
  @ApiResponse({
    description:
        'This api list all the user and datatable and index pagination for more information please check UserListingReqDto schema',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: UserListingResDto,
  })
  @Response(UserListingResDto)
  listing(
      @Query() query: UserListingReqDto
  ) {
    return this.userService.listing(query);
  }

  @ApiResponse({
    description: 'in this api you will get user details',
  })
  @ApiOkResponse({
    type: UserResDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }


  @ApiResponse({
    description: 'in this api you will update user'
  })
  @ApiOkResponse({
    type: UserResDto
  })
  @ApiBadRequestResponse({
    description: 'user email is taken or user try to edit own account',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body:UpdateUserReqDto){
    return this.userService.update(id,body);
  }

  @ApiResponse({
    description: 'in this api you will change user status'
  })
  @ApiOkResponse({
    type: UserResDto
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update-status/:id')
  updateStatus(@Param('id', ParseIntPipe) id:number){
    return this.userService.updateStatus(id);
  }
  @ApiResponse({
    description: 'in this api you will can delete user'
  })
  @ApiBadRequestResponse({
    description: "when user try to delete own account"
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id:number) {
    return this.userService.remove(id);
  }

}
