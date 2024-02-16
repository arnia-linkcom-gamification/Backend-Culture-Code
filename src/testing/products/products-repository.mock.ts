import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../products/entities/product.entity';
import { listAllProductsMock } from './list-all-products.mock';
import { updatedProductMock } from './updated-product.mock';
import { productMock } from './product.mock';

export const productsRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    exists: jest.fn().mockResolvedValue(false),
    create: jest.fn().mockReturnValue(productMock),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(listAllProductsMock),
    findOne: jest.fn().mockResolvedValue(listAllProductsMock[0]),
    update: jest.fn().mockResolvedValueOnce(updatedProductMock),
    softDelete: jest.fn(),
    restore: jest.fn(),
  },
};
