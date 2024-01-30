import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {ModeratorEntity} from '@shareable/database/entities';


export const Moderator = createParamDecorator((data: unknown, ctx: ExecutionContext): ModeratorEntity => {
    const request = ctx.switchToHttp().getRequest();
    return request.moderator;
});
