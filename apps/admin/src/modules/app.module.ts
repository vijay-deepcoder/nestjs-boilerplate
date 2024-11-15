import {Module} from '@nestjs/common';
import {ConfigurationModule} from '@shareable/configuration/configuration.module';
import {Logger} from '@shareable/logger';
import {DatabaseModule} from '@shareable/database/database.module';
import {JwtModule} from '@shareable/jwt/jwt.module';
import {AuthModule} from './auth/auth.module';
import {GeneralModule} from './general/general.module';
import {RepositoryModule} from '@shareable/database/repository/repository.module';
import {ModeratorModule} from './moderator/moderator.module';
import {UserModule} from "./user/user.module";


@Module({
    imports: [
        ConfigurationModule,
        JwtModule,
        DatabaseModule,
        RepositoryModule,
        AuthModule,
        GeneralModule,
        ModeratorModule,
        UserModule,

    ],
    providers: [
        Logger,
    ],
})
export class AppModule {
}
