import { CanActivate, ExecutionContext } from '@nestjs/common';
import { requestMock } from '../req/request.mock';

export const authGuardMock: CanActivate = {
  canActivate: jest.fn((context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    request['token'] = requestMock;

    return true;
  }),
};
