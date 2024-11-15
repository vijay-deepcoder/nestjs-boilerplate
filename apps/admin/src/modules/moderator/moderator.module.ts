import {Module} from '@nestjs/common';
import {ModeratorService} from './moderator.service';
import {ModeratorController} from './moderator.controller';
import {HashService} from '@shareable/hashing/hash.service';

@Module({
    imports: [],
    controllers: [ModeratorController],
    providers: [ModeratorService, HashService],
})
export class ModeratorModule {
}
