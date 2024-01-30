import {DataSource, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common/decorators';
import {UserEntity} from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {

    constructor(dataSource: DataSource){
        super(UserEntity, dataSource.createEntityManager());
    }

    public async getUser(id: number): Promise<UserEntity> {
        return this.findOneBy(id);
    }
    isEmailTaken(email: string): Promise<number> {
        return this.createQueryBuilder()
            .where({ email })
            .getCount();
    }
}