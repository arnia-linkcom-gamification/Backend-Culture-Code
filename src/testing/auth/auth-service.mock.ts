import { AuthService } from '../../auth/auth.service';
import { tokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    login: jest.fn().mockResolvedValueOnce(tokenMock),
  },
};
