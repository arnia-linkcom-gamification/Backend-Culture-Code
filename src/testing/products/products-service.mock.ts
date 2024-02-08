import { ProductsService } from '../../products/products.service';

export const productsServiceMock = {
  provide: ProductsService,
  useValue: {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
    restore: jest.fn(),
    redeemProduct: jest.fn(),
  },
};
