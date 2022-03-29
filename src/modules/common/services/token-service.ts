import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { left, right } from '@src/shared/either';
import { InvalidTokenError } from '../errors/invalid-token';
import { IAuthorizedAdmin, TokenServiceDTO, VerifyTokenResponse } from './dtos/token-service';

interface VerifiedToken {
  id: number;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class TokenService implements TokenServiceDTO {
  constructor(private readonly jwtService: JwtService) {}

  public verify(accessToken?: string): VerifyTokenResponse {
    if (!accessToken) return left(new InvalidTokenError(accessToken));

    const [_, token] = accessToken.split(' ');

    try {
      const { id, sub } = this.jwtService.verify(token) as VerifiedToken;

      if (Number.isNaN(Number(sub))) return left(new InvalidTokenError(accessToken));

      const payload: IAuthorizedAdmin = {
        id: id || parseInt(sub)
      };

      return right(payload);
    } catch (_) {
      return left(new InvalidTokenError(token));
    }
  }
}
