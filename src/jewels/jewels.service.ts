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
import { JewelTypeEnum } from 'src/enums/jewel-type.enum';
import { UsersService } from 'src/users/users.service';
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

  async findByType(type: JewelTypeEnum) {
    try {
      const jewelAlready = await this.jewelRepository.findOne({
        where: {
          type,
        },
      });

      return jewelAlready;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    return await this.jewelRepository.find();
  }

  async findOne(id: number) {
    try {
      const jewel = await this.jewelRepository.findOneOrFail({
        where: { id },
      });

      if (!jewel) {
        throw new NotFoundException('Jewel not found');
      }

      return jewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async putJewel(idJewel: number, idUser: number) {
    try {
      const user = await this.userService.findOne(idUser);

      const jewel = await this.findOne(idJewel);

      await this.userService.putJewel(idUser, jewel);

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateJewelDto: UpdateJewelDto) {
    try {
      const { affected } = await this.jewelRepository.update(
        id,
        updateJewelDto,
      );

      if (affected === 0) {
        throw new NotFoundException('Jewel not exist');
      }

      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} jewel`;
  }
}
