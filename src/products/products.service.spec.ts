import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { usersServiceMock } from '../testing/users/users-service.mock';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';

describe('ProductsService', () => {
  let service: ProductsService;

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

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
