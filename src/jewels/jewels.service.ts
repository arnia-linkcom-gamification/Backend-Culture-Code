import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJewelDto, UploadImageDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Jewel } from './entities/jewel.entity';
import { jewel } from '../utils/consts/jewels';
import { User } from '../users/entities/user.entity';
import { UsersJewels } from './entities/users-jewels.entity';
import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class JewelsService {
  constructor(
    @InjectRepository(Jewel)
    private readonly jewelRepository: Repository<Jewel>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersJewels)
    private readonly usersJewelsRepository: Repository<UsersJewels>,
    private userService: UsersService,
  ) {}

  async create(payload: CreateJewelDto, jewelImage: UploadImageDto) {
    try {
      const jewelExist = await this.jewelRepository.exists({
        where: { type: payload.type },
      });
      if (jewelExist) {
        throw new ConflictException('This jewel already exists.');
      }

      if (!jewelImage) {
        throw new BadRequestException('jewelsImage should not be empty');
      }

      payload.image = await this.upload(jewelImage);
      const newJewel = this.jewelRepository.create(payload);
      newJewel.habilities = jewel[payload.type];

      await this.jewelRepository.save(newJewel);

      return newJewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async upload(file: UploadImageDto) {
    try {
      const configService = new ConfigService();
      const supabaseBucket = configService.get<string>('SUPABASE_DB_NAME');
      const supabase = createClient(
        configService.get<string>('SUPABASE_URL'),
        configService.get<string>('SUPABASE_KEY'),
        {
          auth: {
            persistSession: false,
          },
        },
      );

      const name = file.originalname.split('.')[0];
      const extension = file.originalname.split('.')[1];
      const sanitizedName = name.replace(/[^a-z0-9]/gi, '-');
      const newFileName =
        sanitizedName.split(' ').join('_') + '_' + Date.now() + '.' + extension;

      const imageData = await supabase.storage
        .from(supabaseBucket)
        .upload(newFileName, file.buffer, {
          upsert: true,
        });

      const image = await supabase.storage
        .from(supabaseBucket)
        .createSignedUrl(imageData.data.path, 365250);

      const profileImg = image.data.signedUrl;

      return profileImg;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.jewelRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const jewel = await this.jewelRepository.findOne({
        where: { id },
      });

      if (!jewel) {
        throw new NotFoundException(`Jewel with id:${id} not found.`);
      }

      return jewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    payload: UpdateJewelDto,
    jewelImage?: UploadImageDto,
  ) {
    try {
      await this.findOne(id);

      payload.image = undefined;
      payload.image = jewelImage
        ? await this.upload(jewelImage)
        : payload.image;

      await this.jewelRepository.update(id, payload);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async assign(jewelId: number, userId: number) {
    try {
      const jewel = await this.findOne(jewelId);
      if (!jewel) {
        throw new NotFoundException(`Jewel with id:${jewelId} not found.`);
      }
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`User with id:${userId} not found.`);
      }
      user.credits++;

      await this.userRepository.update(userId, { credits: user.credits });
      const usersJewels = this.usersJewelsRepository.create({
        user: user,
        jewel: jewel,
      });
      await this.usersJewelsRepository.save(usersJewels);

      return await this.userService.findOne(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
