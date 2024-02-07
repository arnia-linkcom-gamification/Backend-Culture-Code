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
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatedProductDoc } from './docs/create-product.doc';
import {
  ResponseCreateProductDoc,
  ResposeProductExist,
} from './docs/response-create-product.doc';
import { ResponseGetProductDoc } from './docs/response-get-product.doc';
import { ResponseDeleteProductDoc } from './docs/response-delete-product.doc';
import { ResponseFindByIdDoc } from './docs/response-find-by-id.doc';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseUpdateProductDoc } from './docs/response-update-product.doc';
import { ResponseRedeemProductDoc } from './docs/response-redeem-product.doc';

@ApiTags('3 - Produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiCreatedResponse({ type: ResponseCreateProductDoc })
  @ApiConflictResponse({ type: ResposeProductExist })
  @ApiBody({ type: CreatedProductDoc })
  @ApiBearerAuth()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ResponseGetProductDoc })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 5,
    @Query('price', new ParseIntPipe({ optional: true })) price?: number,
    @Query('name') name: string = '',
  ) {
    return await this.productsService.findAll(page, limit, price, name);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ type: ResponseFindByIdDoc })
  @ApiParam({
    type: Number,
    name: 'id',
  })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(+id, updateProductDto);
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
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id);
  }

  @Post(':idProduct/user/:idUser')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ type: ResponseRedeemProductDoc })
  @ApiParam({
    type: Number,
    name: 'idProduct',
    description:
      'É o número do id do produto que o usuário selecionou para o resgate',
  })
  @ApiParam({
    type: Number,
    name: 'idUser',
    description: 'É o número do id do usuário que está pedindo o resgate',
  })
  async redeemProduct(
    @Param('idProduct') idProduct: string,
    @Param('idUser') idUser: string,
  ) {
    return await this.productsService.redeemProduct(+idProduct, +idUser);
  }
}
