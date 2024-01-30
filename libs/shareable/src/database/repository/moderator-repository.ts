import {DataSource, Not, Repository} from 'typeorm';
import {Injectable} from '@nestjs/common/decorators';
import {ModeratorEntity} from '@shareable/database/entities';


@Injectable()
export class ModeratorRepository extends Repository<ModeratorEntity> {
    constructor(dataSource: DataSource) {
        super(ModeratorEntity, dataSource.createEntityManager());
    }


    isUniqueMail(email: string, id: number = 0): Promise<number> {
        return this.count({
            where: {
                email,
                id: Not(id),
            },
        })
    }

}
