import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ISellerCustomer } from '../../interfaces/sql_server/seller-customer';
import { Customer } from './customer';
import { Seller } from './seller';

@Entity('Cliente_Vendedor')
export class SellerCustomer implements ISellerCustomer {
  @PrimaryColumn({ type: 'integer', name: 'cliente_id' })
  public readonly customerId!: number;

  @PrimaryColumn({ type: 'integer', name: 'vendedor_id' })
  public readonly sellerId!: number;

  @PrimaryColumn({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @ManyToOne(() => Customer, customer => customer.sellers)
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  public readonly customer!: Customer;

  @ManyToOne(() => Seller, seller => seller.customers)
  @JoinColumn({ name: 'vendedor_id', referencedColumnName: 'id' })
  public readonly seller!: Seller;
}
