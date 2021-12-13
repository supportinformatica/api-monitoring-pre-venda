import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { ISale, SaleType } from '../../interfaces/sql_server/sale';
import { Customer } from './customer';
import { PaymentMethod } from './payment-method';
import { SaleProduct } from './sale-product';
import { Seller } from './seller';

@Entity('PedidoVenda')
export class Sale implements ISale {
  @PrimaryColumn({ type: 'integer' })
  public id!: number;

  @Column({ type: 'integer', name: 'nrOrcamento' })
  public budgetId!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public storeId!: number;

  @Column({ type: 'integer', name: 'vendedor_id' })
  public sellerId!: number;

  @Column({ type: 'integer', name: 'cliente_id' })
  public customerId!: number;

  @Column({ type: 'integer', name: 'formaPagamento_id' })
  public paymentId!: number;

  @Column({ type: 'date', name: 'dtEmissao' })
  public date!: Date;

  @Column({ type: 'money', name: 'vlTotal' })
  public total!: number;

  @Column({ type: 'money', name: 'vlDesconto' })
  public discount!: number;

  @Column({ type: 'varchar', name: 'dsObservacao' })
  public observation!: string;

  @Column({ type: 'bit', name: 'faturada' })
  public concluded!: boolean;

  @Column({ type: 'bit', name: 'deletada' })
  public deleted!: boolean;

  @Column({ type: 'varchar', name: 'tipoPedido' })
  public saleType!: SaleType;

  @OneToMany(() => SaleProduct, products => products.sale)
  public products!: SaleProduct[];

  @ManyToOne(() => Customer, customer => customer.sales)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  public customer!: Customer;

  @ManyToOne(() => PaymentMethod, paymentMethod => paymentMethod.sales)
  @JoinColumn({ name: 'formaPagamento_id', referencedColumnName: 'id' })
  public paymentMethod!: PaymentMethod;

  @ManyToOne(() => Seller, seller => seller.sales)
  @JoinColumn({ name: 'vendedor_id', referencedColumnName: 'id' })
  public seller!: Seller;

  @AfterLoad()
  protected formatValues(): void {
    this.total = parseFloat((this.total * 100).toFixed(2));
    this.discount = parseFloat((this.discount * 100).toFixed(2));
  }
}
