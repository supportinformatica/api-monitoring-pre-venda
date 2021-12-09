import { Either } from '@src/shared/either';
import { InvalidTokenError } from '../../errors/invalid-token';

export interface IAuthorizedAdmin {
  id: number;
}
export type VerifyTokenResponse = Either<InvalidTokenError, IAuthorizedAdmin>;

export interface TokenServiceDTO {
  verify: (token?: string) => VerifyTokenResponse;
}
