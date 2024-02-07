import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { UsersJewels } from 'src/jewels/entities/users-jewels.entity';

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
        throw new ConflictException('An user with this email already exists.');
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
      const users = await this.usersRepository.find({
        relations: ['jewels.jewel', 'products'],
      });

      const returnedUsers = users.map((user) => {
        const jewels = this.groupJewelsByType(user.jewels);

        const jewelsWithCount = Object.values(jewels);

        return {
          ...user,
          jewels: jewelsWithCount,
        };
      });

      return returnedUsers;
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
        relations: ['jewels.jewel', 'products'],
      });
      if (!user) {
        throw new NotFoundException(`User with id:${id} not found.`);
      }

      const jewels = this.groupJewelsByType(user.jewels);
      const jewelsWithCount = Object.values(jewels);

      const userWithCountJewels = { ...user, jewels: jewelsWithCount };

      return userWithCountJewels;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    try {
      await this.findOne(id);
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
        throw new NotFoundException(`User with id:${id} not found.`);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async softDelete(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id:${id} not found.`);
      }

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

  private groupJewelsByType(jewels: UsersJewels[]) {
    return jewels.reduce((previous, current) => {
      const jewel = current.jewel.type;
      previous[jewel] = previous[jewel]
        ? { ...previous[jewel], count: previous[jewel].count + 1 }
        : { ...current.jewel, count: 1 };
      return previous;
    }, {});
  }
}
