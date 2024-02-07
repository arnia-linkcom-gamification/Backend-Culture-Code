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
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private userService: UsersService,
  ) {}

  async create(payload: CreateProductDto) {
    try {
      const productExist = await this.productRepository.findOne({
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

  async findAll(page: number, limit: number, price: number, name: string) {
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
      await this.findOne(id);
      return await this.productRepository.softDelete(id);
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

  async redeemProduct(idProduct: number, idUser: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: idProduct },
      });

      const user = await this.userService.findOne(idUser);

      if (user.credits >= product.price) {
        for (let i = 0; i < product.price; i++) {
          if (user.jewels.length === 0) {
            throw new BadRequestException('Insufficient jewelry balance');
          }
          const userCreditUpdated: UpdateUserDto = {
            credits: user.credits - 1,
            password: user.password,
            confirmPassword: user.password,
          };
          await this.userService.update(idUser, userCreditUpdated);

          // const jewelRemove = user.jewels[i].id;
          // await this.userService.removeJewel(idUser, jewelRemove);
        }

        const userUpdated = await this.userService.redeemProduct(
          idUser,
          product,
        );
        return userUpdated;
      } else {
        throw new BadRequestException(
          'Insufficient balance to redeem the product',
        );
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
