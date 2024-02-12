import { JewelsService } from '../../jewels/jewels.service';
import { listAllJewelsMock } from './list-all-jewels.mock';
import { updatedJewelMock } from './updated-jewel.mock';

export const jewelsServiceMock = {
  provide: JewelsService,
  useValue: {
    create: jest.fn().mockResolvedValueOnce(listAllJewelsMock[0]),
    findAll: jest.fn().mockResolvedValueOnce(listAllJewelsMock),
    findOne: jest.fn().mockResolvedValueOnce(listAllJewelsMock[0]),
    update: jest.fn().mockResolvedValueOnce(updatedJewelMock),
    assign: jest.fn(),
  },
};
