import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';

import { productMock } from '../testing/products/product.mock';
import { UpdateProductDto } from './dto/update-product.dto';
import { updateProductMock } from '../testing/products/update-product-mock';
import { updatedProductMock } from '../testing/products/updated-product.mock';
import { paginationProductsMock } from '../testing/products/pagination-products.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { redeemProductsMock } from '../testing/products/redeem-product.mock';
import { userMock } from '../testing/users/user.mock';
import { usersJewelsMock } from '../testing/users/users-jewels.mock';

describe('ProductsService', () => {
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        productsRepositoryMock,
        usersServiceMock,
        userRepositoryMock,
        usersJewelsRepositoryMock,
      ],
    }).compile();

    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  // describe('Create product', () => {
  //   it('Should save product in database', async () => {
  //     const result = await productService.create(createProductMock);
  //     expect(result).toEqual(productMock);
  //   });
  // });

  describe('Error to create product', () => {
    it('Should save product in database', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('An user with this email already exists.', 409),
        );
      await expect(productService.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Find all products - pagination', () => {
    it('Should return a list of products', async () => {
      const result = await productService.findAll(1, 10);
      expect(result).toEqual(paginationProductsMock);
    });
  });

  describe('Find product by filter - pagination', () => {
    it('Should return the products by filter', async () => {
      const result = await productService.findAll(1, 10, 1, 'Mochila');
      expect(result).toEqual(paginationProductsMock);
    });
  });

  describe('Find Product by Id', () => {
    it('Should return an user', async () => {
      const result = await productService.findOne(1);
      expect(result).toEqual(productMock);
    });
  });

  describe('Not find User by Id', () => {
    it('Should return an error stating that the user was not found', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:10 not found.', 404),
        );
      await expect(productService.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Update Product', () => {
    it('Should return updated user data', async () => {
      const result = await productService.update(
        1,
        updateProductMock as UpdateProductDto,
      );
      expect(result).toEqual(updatedProductMock);
    });
  });

  // describe('SoftDelete Product', () => {
  //   it('Should return updated product data', async () => {
  //     const result = await productService.softDelete(1);
  //     expect(result).toEqual({
  //       message: 'Your request has been successfully fulfilled.',
  //     });
  //   });
  // });

  describe('SoftDelete Product', () => {
    it('Should return an error stating that the product was not found', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:1 not found.', 404),
        );
      await expect(productService.findOne(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Redeem Product', () => {
    it('Should update the user according to the product redemption request.', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockResolvedValueOnce(productMock);

      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockResolvedValueOnce(userMock);

      jest
        .spyOn(usersJewelsRepositoryMock.useValue, 'remove')
        .mockResolvedValueOnce(usersJewelsMock);

      jest
        .spyOn(usersServiceMock.useValue, 'findOne')
        .mockResolvedValueOnce(userMock);

      const result = await productService.redeemProduct(2, 1);
      expect(result).toEqual(redeemProductsMock);
    });
  });
});
