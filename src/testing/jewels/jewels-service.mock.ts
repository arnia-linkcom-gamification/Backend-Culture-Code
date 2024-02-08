import { JewelsService } from '../../jewels/jewels.service';

export const jewelsServiceMock = {
  provide: JewelsService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    assign: jest.fn(),
  },
};
