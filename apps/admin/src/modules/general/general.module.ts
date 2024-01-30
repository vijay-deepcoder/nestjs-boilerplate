import {Module} from '@nestjs/common';
import {GeneralService} from './general.service';
import {GeneralController} from './general.controller';
import {ModeratorRepository} from '@shareable/database/repository';

@Module({
    controllers: [GeneralController],
    providers: [GeneralService, ModeratorRepository],
})
export class GeneralModule {
}
