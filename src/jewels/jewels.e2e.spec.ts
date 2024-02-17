import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { JewelsModule } from './jewels.module';
import { jewelRepositoryMock } from '../testing/jewels/jewel-repository.mock';
import { AuthGuard } from '../auth/guards/auth-guard';
import { authGuardMock } from '../testing/auth/auth-guard.mock';
import { listAllJewelsMock } from '../testing/jewels/list-all-jewels.mock';
import { updateJewelDtoMock } from '../testing/jewels/update-jewel-dto.mock';
import { updatedJewelMock } from '../testing/jewels/updated-jewel.mock';
import { usersJewelsRepositoryMock } from '../testing/jewels/users-jewels-repository.mock';
import { userRepositoryMock } from '../testing/users/user-repository.mock';
import { imageMock } from '../testing/image/image.mock';
import { mockedUploadImage } from '../testing/utils/upload.image.mock';
import { JewelTypeEnum } from '../enums/jewel-type.enum';
describe('Jewels e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [JewelsModule],
    })
      .overrideProvider(jewelRepositoryMock.provide)
      .useValue(jewelRepositoryMock.useValue)
      .overrideProvider(usersJewelsRepositoryMock.provide)
      .useValue(usersJewelsRepositoryMock.useValue)
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

  describe('POST Jewels - e2e', () => {
    it('POST - /jewels', async () => {
      const image = await imageMock();

      jest
        .spyOn(await mockedUploadImage, 'uploadImage')
        .mockResolvedValue('mockedImageUrl');

      const response = await request(app.getHttpServer())
        .post('/jewels')
        .field('type', JewelTypeEnum.time)
        .attach('jewelImage', image.buffer, { filename: 'NestJS.svg' });

      expect(response.statusCode).toEqual(HttpStatus.CREATED);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('type', JewelTypeEnum.time);
      expect(response.body.image).not.toBeNull();
    });
  });

  describe('GET Jewels - e2e', () => {
    it('GET - /jewels', async () => {
      const response = await request(app.getHttpServer()).get('/jewels');

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(listAllJewelsMock);
      expect(response.body).toBeInstanceOf(Array);
    });

    it('GET - /jewels/:id', async () => {
      const response = await request(app.getHttpServer()).get('/jewels/1');

      expect(response.statusCode).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(listAllJewelsMock[0]);
      expect(response.body).toBeInstanceOf(Object);
    });
  });

  describe('PATCH Jewels - e2e', () => {
    it('PATCH - /jewels/:id', async () => {
      const response = await request(app.getHttpServer())
        .patch('/jewels/1')
        .send(updateJewelDtoMock);

      expect(response.status).toEqual(HttpStatus.OK);
      expect(response.body).toEqual(updatedJewelMock);
      expect(response.forbidden).toBe(false);
    });
  });
});
