import { createParamDecorator } from '@nestjs/common';
import { Request, Response } from 'express';

interface AuthorizedDecorator {
  args: [Request, Response];
}

export const Authorized = createParamDecorator((_, { args }: AuthorizedDecorator) => {
  const [request] = args;

  return request.admin;
});
