import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatedProductDoc } from './docs/create-product.doc';
import { ResponseCreateProductDoc } from './docs/response-create-product.doc';
import { ResponsePaginationListProductDoc } from './docs/response-pagination-list-product.doc';
import { PaginationListProductDoc } from './docs/pagination-list-product.doc';
import { ResponseGetProductByFilterDoc } from './docs/response-get-product-by-filter.doc';
import { GetProductByFilterDoc } from './docs/get-product-by-filter.doc';
//import { UpdateProductDto } from './dto/update-product.dto';
@ApiTags('Product')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @ApiResponse({ type: ResponseCreateProductDoc })
  @ApiBody({ type: CreatedProductDoc })
  @ApiBearerAuth()
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiResponse({ type: ResponsePaginationListProductDoc })
  @ApiQuery({ type: PaginationListProductDoc })
  @Get()
  paginationListProduct(
    @Query('page') page: number,
    @Query('productsPerPage') productsPerPage: number,
  ) {
    return this.productsService.paginationListProduct(+page, +productsPerPage);
  }

  @ApiResponse({ type: ResponseGetProductByFilterDoc })
  @ApiQuery({ type: GetProductByFilterDoc })
  @Get('/filter')
  getProductByFilter(
    @Query('page') page: number,
    @Query('productsPerPage') productsPerPage: number,
    @Query('price') price: number,
    @Query('name') name: string,
  ) {
    return this.productsService.getProductByFilter(
      +page,
      +productsPerPage,
      +price,
      name,
    );
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
