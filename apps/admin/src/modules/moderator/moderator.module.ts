import {Module} from '@nestjs/common';
import {ModeratorService} from './moderator.service';
import {ModeratorController} from './moderator.controller';
import {HashService} from '@core/hashing/hash.service';

@Module({
    imports: [],
    controllers: [ModeratorController],
    providers: [ModeratorService, HashService],
})
export class ModeratorModule {
}
