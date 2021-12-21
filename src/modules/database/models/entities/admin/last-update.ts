import { ILastUpdate } from '@src/modules/database/interfaces/sql_server/admin/last-update';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('lastupdate')
export class LastUpdate implements ILastUpdate {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_ID' })
  public readonly storeId!: number;

  @Column({ type: 'nvarchar', name: 'name' })
  public readonly date!: string;
}
