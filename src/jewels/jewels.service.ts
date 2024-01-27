import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJewelDto } from './dto/create-jewel.dto';
//import { UpdateJewelDto } from './dto/update-jewel.dto';
import { Jewel } from './entities/jewel.entity';

@Injectable()
export class JewelsService {
  constructor(
    @InjectRepository(Jewel)
    private jewelRepository: Repository<Jewel>,
  ) {}

  async create(createJewelDto: CreateJewelDto) {
    try {
      const newJewel = this.jewelRepository.create(createJewelDto);

      await this.jewelRepository.save(newJewel);

      return newJewel;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return `This action returns all jewels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jewel`;
  }

  // update(id: number, updateJewelDto: UpdateJewelDto) {
  //   return `This action updates a #${id} jewel`;
  // }

  remove(id: number) {
    return `This action removes a #${id} jewel`;
  }
}
