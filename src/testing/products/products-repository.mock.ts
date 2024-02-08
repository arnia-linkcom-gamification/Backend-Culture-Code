import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../products/entities/product.entity';
import { listAllProductsMock } from './list-all-products.mock';

export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockReturnValue(listAllProductsMock.data[0]),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listAllProductsMock),
    findOne: jest.fn().mockResolvedValue(listAllProductsMock.data[0]),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
  },
};
