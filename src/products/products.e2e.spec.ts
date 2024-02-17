import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { ProductsModule } from './products.module';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { productsRepositoryMock } from '../testing/products/products-repository.mock';

describe('Products e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(productsRepositoryMock.provide)
      .useValue(productsRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    afterAll(async () => {
      await app.close();
    });

    it('Should be defines.', () => {
      expect(app).toBeDefined();
    });
  });
});
