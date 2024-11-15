import { Injectable } from '@nestjs/common';
import { ModeratorRepository } from '@shareable/database/repository';

@Injectable()
export class GeneralService {
  constructor(private moderator: ModeratorRepository) {}
}
