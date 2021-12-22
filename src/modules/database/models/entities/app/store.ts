import { IStore } from '@src/modules/database/interfaces/sql_server/app/store';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Configuracao')
export class Store implements IStore {
  @PrimaryColumn({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'varchar', name: 'nmEmpresa' })
  public readonly name!: string;
}
