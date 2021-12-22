import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ISeller } from '../../../interfaces/sql_server/app/seller';
import { Sale } from './sale';
import { SellerCustomer } from './seller-customer';

@Entity('Vendedor')
export class Seller implements ISeller {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @PrimaryColumn({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'varchar', name: 'nmVendedor' })
  public readonly name!: string;

  @Column({ type: 'varchar', name: 'dsEmail' })
  public readonly email!: string;

  @Column({ type: 'varchar', name: 'dsSenha', select: false })
  public readonly password!: string;

  @Column({ type: 'varchar', name: 'nrTelefone' })
  public readonly phone!: string;

  @Column({ type: 'float', name: 'limiteDescontoMax' })
  public readonly maxDiscount!: number;

  @Column({ type: 'bit', name: 'Ativo' })
  public readonly isActive!: boolean;

  @Column({ type: 'bit', name: 'alteraPreco' })
  public readonly canChangePrice!: boolean;

  @Column({ type: 'bit', name: 'usaCarteira' })
  public readonly useWallet!: boolean;

  @Column({ type: 'bit', name: 'administrador' })
  public readonly admin!: boolean;

  @OneToMany(() => SellerCustomer, customers => customers.seller)
  public readonly customers!: SellerCustomer[];

  @OneToMany(() => Sale, sale => sale.seller)
  public readonly sales!: Sale[];
}
