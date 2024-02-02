import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Patch,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
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
import { ResponseDeleteProductDoc } from './docs/response-delete-product.doc';
import { ResponseFindByIdDoc } from './docs/response-find-by-id.doc';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseUpdateProductDoc } from './docs/response-update-product.doc';
@ApiTags('3 - Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiResponse({ type: ResponseCreateProductDoc })
  @ApiBody({ type: CreatedProductDoc })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiResponse({ type: ResponsePaginationListProductDoc })
  @ApiQuery({ type: PaginationListProductDoc })
  @HttpCode(HttpStatus.OK)
  paginationListProduct(
    @Query('page') page: number,
    @Query('productsPerPage') productsPerPage: number,
  ) {
    return this.productsService.paginationListProduct(+page, +productsPerPage);
  }

  @Get('/filter')
  @ApiResponse({ type: ResponseGetProductByFilterDoc })
  @ApiQuery({ type: GetProductByFilterDoc })
  @HttpCode(HttpStatus.OK)
  getProductByFilter(
    @Query('page') page: string,
    @Query('productsPerPage') productsPerPage: string,
    @Query('price') price: string,
    @Query('name') name: string,
  ) {
    return this.productsService.getProductByFilter(
      +page,
      +productsPerPage,
      +price,
      name,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ResponseFindByIdDoc })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiResponse({ type: ResponseUpdateProductDoc })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ type: ResponseDeleteProductDoc })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
