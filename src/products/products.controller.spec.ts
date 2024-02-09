import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { productsServiceMock } from '../testing/products/products-service.mock';
import { createProductMock } from '../testing/products/create-product.mock';
import { productMock } from '../testing/products/product.mock';
import { paginationProductsMock } from '../testing/products/pagination-products.mock';
import { updateProductMock } from '../testing/products/update-product-mock';
import { updatedProductMock } from '../testing/products/updated-product.mock';
import { UpdateProductDto } from './dto/update-product.dto';
import { redeemProductsMock } from '../testing/products/redeem-product.mock';

describe('ProductsController', () => {
  let productController: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [productsServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    productController = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a product', async () => {
      const result = await productController.create(createProductMock);

      expect(result).toEqual(productMock);
    });
  });

  describe('Find All', () => {
    it('Should find all product - pagination', async () => {
      const result = await productController.findAll(1, 10);

      expect(result).toEqual(paginationProductsMock);
    });
  });

  describe('Find product by Id', () => {
    it('Should return product', async () => {
      const result = await productController.findOne(1);

      expect(result).toEqual(productMock);
    });
  });

  describe('Update product', () => {
    it('Should return product updated', async () => {
      const result = await productController.update(
        1,
        updateProductMock as UpdateProductDto,
      );

      expect(result).toEqual(updatedProductMock);
    });
  });

  describe('Redeem product', () => {
    it('Should return user updated after redeem product', async () => {
      const result = await productController.redeemProduct(2, 1);

      expect(result).toEqual(redeemProductsMock);
    });
  });
});
