import {
  BadRequestException,
  ConflictException,
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
      throw new BadRequestException(error.message);
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
      console.error(error);
      throw error;
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
      const totalPages = allProducts / productsPerPage;
      const payload = {
        products,
        allProducts,
        totalPages,
      };
      return payload;
    } catch (error) {
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
