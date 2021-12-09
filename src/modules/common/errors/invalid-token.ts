import { ControllerError } from '@src/shared/errors-type';

export class InvalidTokenError extends Error implements ControllerError {
  constructor(token?: string) {
    super(`The token "${token}" is invalid`);
    this.name = 'InvalidTokenError';
  }
}
