import { Injectable } from '@nestjs/common';
import { CreateJewelDto } from './dto/create-jewel.dto';
import { UpdateJewelDto } from './dto/update-jewel.dto';

@Injectable()
export class JewelsService {
  create(createJewelDto: CreateJewelDto) {
    return 'This action adds a new jewel';
  }

  findAll() {
    return `This action returns all jewels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jewel`;
  }

  update(id: number, updateJewelDto: UpdateJewelDto) {
    return `This action updates a #${id} jewel`;
  }

  remove(id: number) {
    return `This action removes a #${id} jewel`;
  }
}
