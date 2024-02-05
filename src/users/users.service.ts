import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Jewel } from '../jewels/entities/jewel.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto) {
    try {
      const emailExist = await this.usersRepository.exists({
        where: { email: payload.email },
      });
      if (emailExist) {
        throw new BadRequestException(
          'An user with this email already exists.',
        );
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      const { ...newUserWithoutPass } = newUser;
      delete newUserWithoutPass.password;

      return newUserWithoutPass;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find({
        relations: ['jewels', 'products'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        withDeleted: true,
        relations: ['jewels', 'products'],
      });
      if (!user) {
        throw new HttpException(
          `User with id:${id} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    try {
      if (payload.confirmPassword && !payload.password) {
        throw new BadRequestException("Passwords don't matches.");
      }

      if (payload.email) {
        const emailExist = await this.usersRepository.exists({
          where: { email: payload.email },
        });
        if (emailExist) {
          throw new BadRequestException(
            'An user with this email already exists.',
          );
        }
      }

      if (payload.password) {
        const user = await this.findOne(id);
        await this.usersRepository.save(Object.assign(user, payload));
        return await this.findOne(id);
      }

      await this.usersRepository.update(id, payload);
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async redeemProduct(id: number, product: Product) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['jewels', 'products'],
      });
      user.products.push(product);
      await this.usersRepository.save(Object.assign(user));
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async putJewel(id: number, jewelPutted: Jewel) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['jewels'],
      });

      user.jewels.push(jewelPutted);

      await this.usersRepository.save(Object.assign(user));
      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async removeJewel(id: number, jewelToRemoveId: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['jewels'],
      });

      if (user) {
        user.jewels = user.jewels.filter(
          (jewel) => jewel.id !== jewelToRemoveId,
        );

        await this.usersRepository.save(user);

        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async softDelete(id: number) {
    try {
      return await this.usersRepository.softDelete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async restore(id: number) {
    try {
      return await this.usersRepository.restore(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
