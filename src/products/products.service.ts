import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UsersService } from '../users/users.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { UsersJewels } from '../jewels/entities/users-jewels.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UsersJewels)
    private readonly usersJewelsRepository: Repository<UsersJewels>,
    private userService: UsersService,
  ) {}

  async create(payload: CreateProductDto) {
    try {
      const productExist = await this.productRepository.exists({
        where: {
          name: payload.name,
        },
      });
      if (productExist) {
        throw new ConflictException('This product already exists');
      }

      const newProduct = this.productRepository.create(payload);

      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(page?: number, limit?: number, price?: number, name?: string) {
    try {
      const products = await this.productRepository.find({
        where: { price, name: ILike(`%${name}%`) },
        skip: (page - 1) * limit,
        take: limit,
        order: {
          createAt: 'DESC',
        },
      });

      return {
        currentPage: page,
        pageSize: limit,
        count: products.length,
        data: products,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });

      if (!product) {
        throw new NotFoundException(`Product with id:${id} not found.`);
      }

      return product;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateProductDto) {
    try {
      await this.findOne(id);

      await this.productRepository.update(id, payload);

      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async softDelete(id: number) {
    try {
      const user = await this.productRepository.findOne({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Product with id:${id} not found.`);
      }
      await this.productRepository.softDelete(id);

      return { message: 'Your request has been successfully fulfilled.' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async restore(id: number) {
    try {
      await this.findOne(id);
      return await this.productRepository.restore(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async redeemProduct(productId: number, userId: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with id:${productId} not found.`);
      }

      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['jewels.jewel', 'products'],
      });
      if (!user) {
        throw new NotFoundException(`User with id:${userId} not found.`);
      }

      if (product.price > user.credits) {
        throw new BadRequestException(`Insufficient jewelry balance.`);
      }

      user.credits = user.credits - product.price;
      user.products.push(product);
      await this.userRepository.save(user);

      for (let i = 0; i < product.price; i++) {
        const jewelRemoved = user.jewels[i];
        await this.usersJewelsRepository.remove(jewelRemoved);
      }

      return await this.userService.findOne(userId);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
