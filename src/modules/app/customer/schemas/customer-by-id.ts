import { ApiProperty } from '@nestjs/swagger';
import { DocumentType } from '@src/modules/database/interfaces';
import { CustomerById } from './../interfaces/customer-by-id';

export class CustomerByIdSchema implements CustomerById {
  @ApiProperty({ type: 'string' })
  public readonly name!: string;

  @ApiProperty({ type: 'string' })
  public readonly email!: string;

  @ApiProperty({ type: 'string' })
  public readonly phone!: string;

  @ApiProperty({ type: 'string' })
  public readonly document!: string;

  @ApiProperty({ type: 'string', enum: ['CPF', 'CNPJ'] })
  public readonly documentType!: DocumentType;

  @ApiProperty({ type: 'string' })
  public readonly observation!: string;

  @ApiProperty({ type: 'string' })
  public readonly state!: string;

  @ApiProperty({ type: 'string' })
  public readonly city!: string;

  @ApiProperty({ type: 'string' })
  public readonly district!: string;

  @ApiProperty({ type: 'string' })
  public readonly street!: string;

  @ApiProperty({ type: 'string' })
  public readonly number!: string;

  @ApiProperty({ type: 'string' })
  public readonly zipCode!: string;

  @ApiProperty({ type: 'string' })
  public readonly complement!: string;

  @ApiProperty({ type: 'boolean' })
  public readonly isWholesale!: boolean;

  @ApiProperty({ type: 'boolean' })
  public readonly hasRestriction!: boolean;
}
