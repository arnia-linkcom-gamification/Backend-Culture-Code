import { JewelsService } from '../../jewels/jewels.service';
import { createJewelMock } from './create-jewel.mock';
import { listAllJewelsMock } from './list-all-jewels.mock';
import { updatedJewelMock } from './updated-jewel.mock';

export const jewelsServiceMock = {
  provide: JewelsService,
  useValue: {
    create: jest.fn().mockResolvedValueOnce(createJewelMock),
    findAll: jest.fn().mockResolvedValueOnce(listAllJewelsMock),
    findOne: jest.fn().mockResolvedValueOnce(listAllJewelsMock[0]),
    update: jest.fn().mockResolvedValueOnce(updatedJewelMock),
    assign: jest.fn(),
  },
};
