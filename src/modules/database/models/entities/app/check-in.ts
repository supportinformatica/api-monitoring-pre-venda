import { ICheckIn } from '@src/modules/database/interfaces';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer, Sale, Seller } from '.';

@Entity('Check_in')
export class CheckIn implements ICheckIn {
  @PrimaryGeneratedColumn('increment', { type: 'integer' })
  public readonly id!: number;

  @Column({ type: 'integer', name: 'store_id' })
  public readonly storeId!: number;

  @Column({ type: 'integer', name: 'vendedor_id' })
  public readonly sellerId!: number;

  @Column({ type: 'integer', name: 'cliente_id' })
  public readonly customerId!: number;

  @Column({ type: 'integer', name: 'pedidovenda_id', nullable: true })
  public readonly saleId!: number;

  @Column({ type: 'varchar', name: 'latitude' })
  public readonly lat!: string;

  @Column({ type: 'varchar', name: 'longitude' })
  public readonly long!: string;

  @Column({ type: 'datetime', name: 'dtCriacao' })
  public readonly createdAt!: Date;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'storeId' })
  @JoinColumn({ name: 'cliente_id', referencedColumnName: 'id' })
  public readonly customer!: Customer;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'pedidovenda_id', referencedColumnName: 'id' })
  public readonly sale!: Sale;

  @ManyToOne(() => Seller)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'storeId' })
  @JoinColumn({ name: 'vendedor_id', referencedColumnName: 'id' })
  public readonly seller!: Seller;
}
