import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { listAllProductsMock } from '../testing/products/list-all-products.mock';
import { createProductMock } from '../testing/products/create-product.mock';
import { productMock } from '../testing/products/product.mock';

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

  describe('Create product', () => {
    it('Should save product in database', async () => {
      const result = await productService.create(createProductMock);
      expect(result).toEqual(productMock);
    });
  });

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

  describe('Find Product by Id', () => {
    it('Should return an user', async () => {
      const result = await productService.findOne(1);
      expect(result).toEqual(listAllProductsMock.data[0]);
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
});
