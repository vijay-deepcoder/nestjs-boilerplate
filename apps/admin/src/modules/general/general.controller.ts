import { Controller, UseGuards} from '@nestjs/common';
import {GeneralService} from './general.service';
import {ApiBearerAuth, ApiUnauthorizedResponse} from '@nestjs/swagger';

import {ModeratorGuard} from '../../gaurds/moderator.guard';


@Controller()
@ApiBearerAuth()
@UseGuards(ModeratorGuard)
@ApiUnauthorizedResponse({
    description: "Token expire/invalid/not provided"
})
export class GeneralController {
    constructor(private readonly generalService: GeneralService) {
    }
}
