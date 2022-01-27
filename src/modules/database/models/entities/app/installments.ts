import { IInstallments } from '@src/modules/database/interfaces/sql_server/app/installments';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Customer } from '.';

@Entity('Parcela')
export class Installments implements IInstallments {
  @PrimaryColumn({ type: 'integer', name: 'parcelaID' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'integer', name: 'cliente_Id' })
  public readonly customerId!: number;

  @Column({ type: 'varchar', name: 'dsDocumento' })
  public readonly document!: string;

  @Column({ type: 'money', name: 'vlValor' })
  public readonly value!: number;

  @Column({ type: 'money', name: 'vlAmortizado' })
  public readonly discount!: number;

  @Column({ type: 'datetime', name: 'dtVencimento' })
  public readonly dueDate!: Date;

  @ManyToOne(() => Customer, customer => customer.installments)
  @JoinColumn({ name: 'cliente_Id', referencedColumnName: 'id' })
  public readonly customer!: Customer;
}
