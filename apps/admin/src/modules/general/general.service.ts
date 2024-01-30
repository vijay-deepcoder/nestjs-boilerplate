import {Injectable} from '@nestjs/common';
import {UpdateProfileReqDto} from './dto';
import {ModeratorRepository} from '@shareable/database/repository';
import {ModeratorEntity} from '@shareable/database/entities';
import {ApiException, ErrorCodes} from '@core/exception';
import {UserEnum} from '@core/enum';

@Injectable()
export class GeneralService {
    constructor(
        private moderator: ModeratorRepository,
    ) {
    }

}
