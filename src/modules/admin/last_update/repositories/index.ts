import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LastUpdate } from '@src/modules/database/models';
import { MSSQL_ADMIN_NAME } from '@src/server/settings';
import { Repository } from 'typeorm';
import { LastUpdateRepositoryDTO } from './dtos/last-update-repository';

@Injectable()
export class LastUpdateRepository implements LastUpdateRepositoryDTO {
  constructor(
    @InjectRepository(LastUpdate, MSSQL_ADMIN_NAME)
    private readonly repository: Repository<LastUpdate>
  ) {}

  public findAll(): Promise<LastUpdate[]> {
    return this.repository.createQueryBuilder().getMany();
  }
}
