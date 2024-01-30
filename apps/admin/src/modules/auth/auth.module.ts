import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {HashService} from '@core/hashing/hash.service';
import {ModeratorRepository} from '@shareable/database/repository';


@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, HashService, ModeratorRepository],
})
export class AuthModule {
}
