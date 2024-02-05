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
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { jewel } from 'src/utils/consts/jewels';

@Injectable()
export class JewelsService {
  constructor(
    @InjectRepository(Jewel)
    private jewelRepository: Repository<Jewel>,
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
        throw new NotFoundException(`Jewel with id:${id} not found`);
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

  async putJewel(idJewel: number, idUser: number) {
    try {
      const user = await this.userService.findOne(idUser);
      if (!user) {
        throw new NotFoundException('This user not exists');
      }
      if (!user) {
        throw new NotFoundException('This user not exists');
      }

      const jewel = await this.findOne(idJewel);
      if (!jewel) {
        throw new NotFoundException('This jewel not exists');
      }

      const userCreditUpdated: UpdateUserDto = {
        credits: user.credits + 1,
        password: user.password,
        confirmPassword: user.password,
      };
      await this.userService.update(idUser, userCreditUpdated);

      return await this.userService.putJewel(idUser, jewel);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
