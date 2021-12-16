import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { ISale, SaleType, SaleStatus } from '../../interfaces/sql_server/sale';
import { Customer } from './customer';
import { PaymentMethod } from './payment-method';
import { SaleProduct } from './sale-product';
import { Seller } from './seller';

@Entity('PedidoVenda')
export class Sale implements ISale {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'nrOrcamento' })
  public readonly budgetId!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'integer', name: 'vendedor_id' })
  public readonly sellerId!: number;

  @Column({ type: 'integer', name: 'cliente_id' })
  public readonly customerId!: number;

  @Column({ type: 'integer', name: 'formaPagamento_id' })
  public readonly paymentId!: number;

  @Column({ type: 'date', name: 'dtEmissao' })
  public readonly date!: Date;

  @Column({ type: 'money', name: 'vlTotal' })
  public readonly total!: number;

  @Column({ type: 'money', name: 'vlDesconto' })
  public readonly discount!: number;

  @Column({ type: 'varchar', name: 'dsObservacao' })
  public readonly observation!: string;

  @Column({ type: 'bit', name: 'faturada' })
  public readonly concluded!: boolean;

  @Column({ type: 'bit', name: 'deletada' })
  public readonly deleted!: boolean;

  @Column({ type: 'varchar', name: 'tipoPedido' })
  public readonly saleType!: SaleType;

  @Column({ type: 'integer', name: 'situacaoApp' })
  public readonly saleStatus!: SaleStatus;

  @OneToMany(() => SaleProduct, products => products.sale)
  public readonly products!: SaleProduct[];

  @ManyToOne(() => Customer, customer => customer.sales)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  public readonly customer!: Customer;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.sales)
  @JoinColumn({ name: 'formaPagamento_id', referencedColumnName: 'id' })
  public readonly paymentMethod!: PaymentMethod;

  @ManyToOne(() => Seller, seller => seller.sales)
  @JoinColumn({ name: 'vendedor_id', referencedColumnName: 'id' })
  public readonly seller!: Seller;

  @AfterLoad()
  protected formatValues(): void {
    const total = this.total ? parseFloat((this.total * 100).toFixed(2)) : undefined;
    const discount = this.discount ? parseFloat((this.discount * 100).toFixed(2)) : undefined;

    Object.assign(this, { total, discount });
  }
}
