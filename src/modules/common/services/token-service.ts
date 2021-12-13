import JwtService from 'jsonwebtoken';
import * as Settings from '@src/server/settings';

import { left, right } from '@src/shared/either';
import { InvalidTokenError } from '../errors/invalid-token';
import { IAuthorizedAdmin, TokenServiceDTO, VerifyTokenResponse } from './dtos/token-service';

interface VerifiedToken {
  sub: string;
  iat: number;
  exp: number;
}

export class TokenService implements TokenServiceDTO {
  constructor(private readonly jwtService = JwtService) {}

  public verify(accessToken?: string): VerifyTokenResponse {
    if (!accessToken) return left(new InvalidTokenError(accessToken));

    const [_, token] = accessToken.split(' ');

    try {
      const { sub } = this.jwtService.verify(token, Settings.AUTH_KEY_SECURITY) as VerifiedToken;

      if (Number.isNaN(Number(sub))) return left(new InvalidTokenError(accessToken));

      const payload: IAuthorizedAdmin = {
        id: parseInt(sub)
      };

      return right(payload);
    } catch (_) {
      return left(new InvalidTokenError(token));
    }
  }
}
