import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';
import { updateUserMock } from '../testing/users/update-user-dto.mock';
import { updatedUserMock } from '../testing/users/updated-user.mock';

describe('Users e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(userRepositoryMock.provide)
      .useValue(userRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Should be defined.', () => {
    expect(app).toBeDefined();
  });

  describe('POST Users - e2e', () => {
    it('POST - /users', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserDtoMock);

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toEqual(userMock);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('GET Users - e2e', () => {
    it('GET - /users', async () => {
      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(listAllUsersMock);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('GET - /users/me', async () => {
      const response = await request(app.getHttpServer()).get('/users/me');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
      expect(response.body).toBeInstanceOf(Object);
    });

    it('GET - /users/id', async () => {
      const response = await request(app.getHttpServer()).get('/users/1');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual(userMock);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PATCH Users - e2e', () => {
    it('PATCH - /users/me', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/me')
        .send(updateUserMock);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(updatedUserMock);
    });

    it('PATCH - /users/id', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/1')
        .send(updateUserMock);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(updatedUserMock);
    });

    it('PATCH - /users/id/restore', async () => {
      const response = await request(app.getHttpServer())
        .patch('/users/1/restore')
        .send(updateUserMock);

      expect(response.status).toEqual(HttpStatus.NO_CONTENT);
      expect(response.body).toStrictEqual({});

      const resourceRestored = await userRepositoryMock.useValue.findOne(1);
      expect(resourceRestored).toBeTruthy();
    });
  });

  describe('DELETE - Users - e2e', () => {
    it('DELETE - /users/me', async () => {
      const response = await request(app.getHttpServer()).delete('/users/me/');

      expect(response.status).toEqual(HttpStatus.NO_CONTENT);
      expect(response.header['content-type']).toBeFalsy();
    });

    it('DELETE - /users/id', async () => {
      const response = await request(app.getHttpServer()).delete('/users/1');

      expect(response.status).toEqual(HttpStatus.NO_CONTENT);
      expect(response.body).toStrictEqual({});
      expect(response.header['content-type']).toBeFalsy();
    });
  });
});
