import {Global, Module} from '@nestjs/common';
import {ModeratorRepository} from '@shareable/database/repository/moderator-repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModeratorEntity} from '@shareable/database/entities';
import {UserEntity} from "@shareable/database/entities";
import {UserRepository} from "@shareable/database/repository/user-repository";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([ModeratorEntity, UserEntity]),
    ],
    providers: [ModeratorRepository,UserRepository],
    exports: [ModeratorRepository,UserRepository]
})
export class RepositoryModule {

}