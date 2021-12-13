import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { DocumentType, ICustomer } from '../../interfaces/sql_server/customer';
import { Sale } from './sale';
import { SellerCustomer } from './seller-customer';

@Entity('Cliente')
export class Customer implements ICustomer {
  @PrimaryColumn({ type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'varchar', name: 'nmCliente' })
  public readonly name!: string;

  @Column({ type: 'varchar', name: 'dsEmail' })
  public readonly email!: string;

  @Column({ type: 'varchar', name: 'nrTelefone' })
  public readonly phone!: string;

  @Column({ type: 'varchar', name: 'dsDocumento' })
  public readonly document!: string;

  @Column({ type: 'varchar', name: 'dsTipoDocumento' })
  public readonly documentType!: DocumentType;

  @Column({ type: 'varchar', name: 'dsObservacao' })
  public readonly observation!: string;

  @Column({ type: 'varchar', name: 'dsUF' })
  public readonly state!: string;

  @Column({ type: 'varchar', name: 'dsCidade' })
  public readonly city!: string;

  @Column({ type: 'varchar', name: 'dsBairro' })
  public readonly district!: string;

  @Column({ type: 'varchar', name: 'nmLogradouro' })
  public readonly street!: string;

  @Column({ type: 'varchar', name: 'nrNumero' })
  public readonly number!: string;

  @Column({ type: 'varchar', name: 'nrCEP' })
  public readonly zipCode!: string;

  @Column({ type: 'varchar', name: 'dsComplemento' })
  public readonly complement!: string;

  @Column({ type: 'bit', name: 'isAtacadista' })
  public readonly isWholesale!: boolean;

  @Column({ type: 'bit', name: 'clienteRestricao' })
  public readonly hasRestriction!: boolean;

  @OneToMany(() => SellerCustomer, sellers => sellers.customer)
  public readonly sellers!: SellerCustomer[];

  @OneToMany(() => Sale, sales => sales.customer)
  public readonly sales!: Sale[];
}
