import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { createUserDtoMock } from '../testing/users/create-user-dto.mock';
import { userMock } from '../testing/users/user.mock';
import { listAllUsersMock } from '../testing/users/list-all-users.mock';

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

      expect(response.statusCode).toEqual(201);
      expect(response.body).toEqual(userMock);
    });
  });

  describe('GET Users - e2e', () => {
    it('GET - /users', async () => {
      const response = await request(app.getHttpServer()).get('/users').send();

      expect(response.status).toEqual(200);
      expect(response.body).toEqual(listAllUsersMock);
    });

    // it('GET - /users/me', async () => {
    //   const response = await request(app.getHttpServer())
    //     .get('/users/me')
    //     .send();

    //   expect(response.status).toBe(200);
    // });
  // });
  // it('GET - /users/id', async () => {
  //   const response = await request(app.getHttpServer()).get('/users/1');

  //   expect(response.status).toBe(200);
  // });
  //   });

  //   describe('POST Users - e2e', () => {
  //     it('POST - /users', async () => {
  //       const response = await request(app.getHttpServer()).post('/users');

  //       expect(response.status).toEqual(201);
  //     });
  //   });

  //   describe('PATCH Users - e2e', () => {
  //     it('PATCH - /users/me', async () => {
  //       const response = await request(app.getHttpServer()).patch('/users/me');
  //       expect(response.status).toEqual(201);
  //     });

  //     it('PATCH - /users/id', async () => {
  //       const response = await request(app.getHttpServer()).patch('/users/1');
  //       expect(response.status).toEqual(201);
  //     });

  //     it('PATCH - /users/id/restore', async () => {
  //       const response = await request(app.getHttpServer()).patch(
  //         '/v1/users/1/restore',
  //       );
  //       expect(response.status).toEqual(200);
  //     });
  //   });

  // describe('PATCH Users - e2e', () => {
  //   it('PATCH - /users/');
  // });
});

// describe('Users', () => {
//   let app: INestApplication;
//   const userService = { findAll: () => listAllUsersMock };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [UsersModule],
//     })
//       .overrideProvider(userRepositoryMock.provide)
//       .useValue(userRepositoryMock.useValue)
//       .overrideGuard(AuthGuard)
//       .useValue(authGuardMock)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   it(`/GET users`, () => {
//     return request(app.getHttpServer()).get('/users').expect(200).expect({
//       data: userService.findAll(),
//     });
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });
