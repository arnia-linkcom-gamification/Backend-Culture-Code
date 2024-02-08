import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJewelDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Jewel } from './entities/jewel.entity';
import { jewel } from '../utils/consts/jewels';
import { User } from '../users/entities/user.entity';
import { UsersJewels } from './entities/users-jewels.entity';
import { UsersService } from '../users/users.service';

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

  async create(payload: CreateJewelDto) {
    try {
      const jewelExist = await this.jewelRepository.exists({
        where: { type: payload.type },
      });
      if (jewelExist) {
        throw new ConflictException('This jewel already exists.');
      }

      const newJewel = this.jewelRepository.create(payload);
      newJewel.habilities = jewel[payload.type];

      await this.jewelRepository.save(newJewel);

      return newJewel;
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

  async update(id: number, payload: UpdateJewelDto) {
    try {
      await this.findOne(id);

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
