import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ISaleProduct } from '../../interfaces/sql_server/sale-product';
import { Product } from './product';
import { Sale } from './sale';

@Entity('ItemPedidoVenda')
export class SaleProduct implements ISaleProduct {
  @PrimaryColumn({ type: 'integer' })
  public id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public storeId!: number;

  @Column({ type: 'integer', name: 'pedidoVenda_id' })
  public saleId!: number;

  @Column({ type: 'integer', name: 'produto_id' })
  public productId!: number;

  @Column({ type: 'float', name: 'qtdVendido' })
  public quantity!: number;

  @Column({ type: 'money', name: 'vlUnitarioBruto' })
  public grossValue!: number;

  @Column({ type: 'money', name: 'vlUnitarioLiquido' })
  public netValue!: number;

  @ManyToOne(() => Product, product => product.sales)
  @JoinColumn({ name: 'produto_id', referencedColumnName: 'id' })
  public product!: Product;

  @ManyToOne(() => Sale, sale => sale.products)
  @JoinColumn({ name: 'pedidoVenda_id', referencedColumnName: 'id' })
  public sale!: Sale;

  @AfterLoad()
  protected formatValues(): void {
    this.grossValue = parseFloat((this.grossValue * 100).toFixed(2));
    this.netValue = parseFloat((this.netValue * 100).toFixed(2));
  }
}
