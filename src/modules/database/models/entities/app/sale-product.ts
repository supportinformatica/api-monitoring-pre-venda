import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ISaleProduct } from '../../../interfaces/sql_server/app/sale-product';
import { Product } from './product';
import { Sale } from './sale';

@Entity('ItemPedidoVenda')
export class SaleProduct implements ISaleProduct {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'integer', name: 'pedidoVenda_id' })
  public readonly saleId!: number;

  @Column({ type: 'integer', name: 'produto_id' })
  public readonly productId!: number;

  @Column({ type: 'float', name: 'qtdVendido' })
  public readonly quantity!: number;

  @Column({ type: 'money', name: 'vlUnitarioBruto' })
  public readonly grossValue!: number;

  @Column({ type: 'money', name: 'vlUnitarioLiquido' })
  public readonly netValue!: number;

  @ManyToOne(() => Product, product => product.sales)
  @JoinColumn({ name: 'produto_id', referencedColumnName: 'id' })
  public readonly product!: Product;

  @ManyToOne(() => Sale, sale => sale.products)
  @JoinColumn({ name: 'pedidoVenda_id', referencedColumnName: 'id' })
  public readonly sale!: Sale;
}
