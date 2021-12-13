import JwtService from 'jsonwebtoken';
import * as Settings from '@src/server/settings';

import { left, right } from '@src/shared/either';
import { InvalidTokenError } from '../errors/invalid-token';
import { IAuthorizedAdmin, TokenServiceDTO, VerifyTokenResponse } from './dtos/token-service';
import { Injectable } from '@nestjs/common';

interface VerifiedToken {
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService implements TokenServiceDTO {
  public verify(accessToken?: string): VerifyTokenResponse {
    if (!accessToken) return left(new InvalidTokenError(accessToken));

    const [_, token] = accessToken.split(' ');

    try {
      const { sub } = JwtService.verify(token, Settings.AUTH_KEY_SECURITY) as VerifiedToken;

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
