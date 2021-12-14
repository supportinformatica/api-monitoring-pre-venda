import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IProduct } from '../../interfaces/sql_server/product';
import { SaleProduct } from './sale-product';

@Entity('Produto')
export class Product implements IProduct {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'varchar', name: 'nmProduto' })
  public readonly name!: string;

  @Column({ type: 'bit', name: 'Ativo' })
  public readonly isActive!: boolean;

  @Column({ type: 'varchar', name: 'url_imagem' })
  public readonly image!: string;

  @Column({ type: 'varchar', name: 'url_default' })
  public readonly defaultImage!: string;

  @OneToMany(() => SaleProduct, sales => sales.product)
  public readonly sales!: SaleProduct[];
}
