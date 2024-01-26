import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.findByName(createProductDto.name);
      if (product) {
        throw new ConflictException('This product already exists');
      }
      const newProduct = this.productRepository.create(createProductDto);
      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findByName(name: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          name,
        },
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async paginationListProduct(page: number, productsPerPage: number) {
    try {
      if (!page || !productsPerPage) {
        throw new BadRequestException('The request is incomplete');
      }
      const allProducts = (await this.productRepository.find()).length;
      const products = await this.productRepository
        .createQueryBuilder('product')
        .skip((page - 1) * productsPerPage)
        .take(productsPerPage)
        .getMany();
      const totalPages = Math.ceil(allProducts / productsPerPage);
      const payload = {
        products,
        allProducts,
        totalPages,
      };
      return payload;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async getProductByFilter(
    page: number,
    productsPerPage: number,
    price: number,
    name: string,
  ) {
    try {
      const queryBuilder = this.productRepository
        .createQueryBuilder('product')
        .skip((page - 1) * productsPerPage)
        .take(productsPerPage);

      if (price && name) {
        queryBuilder.andWhere(
          'product.price = :price AND product.name = :name',
          { price, name },
        );
      } else if (price) {
        queryBuilder.andWhere('product.price = :price', { price });
      } else if (name) {
        queryBuilder.andWhere('LOWER(TRIM(product.name)) LIKE :name', {
          name: `%${name.toLowerCase()}%`,
        });
      }

      const products = await queryBuilder.getMany();

      if (products.length === 0) {
        throw new NotFoundException('There is not product to this filter');
      }
      return products;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateProductDto) {
    try {
      const { affected } = await this.productRepository.update(
        id,
        updateProductDto,
      );
      if (affected === 0) {
        throw new NotFoundException('Product not found');
      }
      return await this.findOne(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      if (!id) {
        throw new BadRequestException('Id should be informed');
      }
      const { affected } = await this.productRepository.delete(id);
      if (affected === 0) {
        throw new NotFoundException('User not found');
      }
      return {
        message: 'Request made successfully',
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
