import { ProductsService } from '../../products/products.service';
import { paginationProductsMock } from './pagination-products.mock';
import { productMock } from './product.mock';
import { redeemProductsMock } from './redeem-product.mock';
import { updatedProductMock } from './updated-product.mock';

export const productsServiceMock = {
  provide: ProductsService,
  useValue: {
    create: jest.fn().mockResolvedValue(productMock),
    findAll: jest.fn().mockResolvedValue(paginationProductsMock),
    findOne: jest.fn().mockResolvedValue(productMock),
    update: jest.fn().mockResolvedValue(updatedProductMock),
    softDelete: jest.fn(),
    restore: jest.fn(),
    redeemProduct: jest.fn().mockResolvedValueOnce(redeemProductsMock),
  },
};
