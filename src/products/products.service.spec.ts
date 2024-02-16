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
import { createProductMock } from '../testing/products/create-product.mock';
import { imageMock } from '../testing/image/image.mock';
import { mockedUploadImage } from '../testing/utils/upload.image.mock';
import { listAllProductsMock } from '../testing/products/list-all-products.mock';

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
      const productImage = await imageMock();
      jest
        .spyOn(await mockedUploadImage, 'uploadImage')
        .mockResolvedValue('mockedImageUrl');

      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(null);

      const result = await productService.create(
        createProductMock,
        productImage,
      );
      expect(result).toEqual(productMock);
    });
  });

  it('Should return an error message', async () => {
    const productImage = await imageMock();

    jest
      .spyOn(await mockedUploadImage, 'uploadImage')
      .mockResolvedValue('mockedImageUrl');
    jest
      .spyOn(productsRepositoryMock.useValue, 'findOne')
      .mockRejectedValueOnce(
        new HttpException('This product already exists', 409),
      );

    await expect(
      productService.create(createProductMock, productImage),
    ).rejects.toThrow(HttpException);
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
    it('Should return a product', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockResolvedValue(listAllProductsMock[0]);

      const result = await productService.findOne(1);
      expect(result).toEqual(productMock);
    });

    describe('Not find User by Id', () => {
      it('Should return an error stating that the product was not found', async () => {
        jest
          .spyOn(productsRepositoryMock.useValue, 'findOne')
          .mockRejectedValueOnce(
            new HttpException('Product with id:10 not found.', 404),
          );
        await expect(productService.findOne(1)).rejects.toThrow(HttpException);
      });
    });
  });

  describe('Update Product', () => {
    it('Should return updated product data', async () => {
      const productImage = await imageMock();

      jest
        .spyOn(await mockedUploadImage, 'uploadImage')
        .mockResolvedValue('mockedImageUrl');

      const result = await productService.update(
        1,
        updateProductMock as UpdateProductDto,
        productImage,
      );
      expect(result).toEqual(updatedProductMock);
    });

    it('Should return an error stating that the product was not found', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:1 not found.', 400),
        );

      await expect(
        productService.update(1, updateProductMock as UpdateProductDto),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('SoftDelete Product', () => {
    it('Should perform logical deletion of the product record', async () => {
      const result = await productService.softDelete(1);
      expect(result).toBeUndefined();
    });

    it('Should return an error stating that the product was not found', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:1 not found.', 404),
        );
      await expect(productService.softDelete(1)).rejects.toThrow(HttpException);
    });
  });

  describe('Restore Product', () => {
    it('Should restore product', async () => {
      const result = await productService.restore(1);
      expect(result).toBeUndefined();
    });

    it('Should return an error stating that the product was not found', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:1 not found.', 404),
        );
      await expect(productService.softDelete(1)).rejects.toThrow(HttpException);
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

    it('Should return an error stating that the product was not found.', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('Product with id:1 not found.', 404),
        );

      await expect(productService.redeemProduct(2, 1)).rejects.toThrow(
        HttpException,
      );
    });

    it('Should return an error stating that the user was not found.', async () => {
      jest
        .spyOn(productsRepositoryMock.useValue, 'findOne')
        .mockResolvedValueOnce(productMock);

      jest
        .spyOn(userRepositoryMock.useValue, 'findOne')
        .mockRejectedValueOnce(
          new HttpException('User with id:1 not found.', 404),
        );

      await expect(productService.redeemProduct(2, 1)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
