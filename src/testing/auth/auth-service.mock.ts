import { AuthService } from '../../auth/auth.service';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    login: jest.fn(),
  },
};
