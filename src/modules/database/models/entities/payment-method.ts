import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IPaymentMethod } from '../../interfaces/sql_server/payment-method';
import { Sale } from './sale';

@Entity('FormaPagamento')
export class PaymentMethod implements IPaymentMethod {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'varchar', name: 'nmPagamento' })
  public readonly name!: string;

  @Column({ type: 'integer', name: 'codigoPagSAEF' })
  public readonly code!: number;

  @Column({ type: 'varchar', name: 'Pag_obs' })
  public readonly observation!: string;

  @OneToMany(() => Sale, sales => sales.paymentMethod)
  public readonly sales!: Sale[];
}
