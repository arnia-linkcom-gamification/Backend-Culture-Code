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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UploadImageDto } from './dto/create-product.dto';
import { CreatedProductDoc } from './docs/create-product.doc';
import {
  ResponseCreateProductDoc,
  ResponseNotFoundProductDoc,
  ResposeProductExist,
} from './docs/response-create-product.doc';
import { ResponseGetProductDoc } from './docs/response-get-product.doc';
import { AuthGuard } from '../auth/guards/auth-guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { Roles } from '../decorators/role.decorator';
import { RoleEnum } from '../enums/role.enum';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseUpdateProductDoc } from './docs/response-update-product.doc';
import { ResponseRedeemProductDoc } from './docs/response-redeem-product.doc';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('productImage'))
  async create(
    @Body() payload: CreateProductDto,
    @UploadedFile() productImage: UploadImageDto,
  ) {
    return await this.productsService.create(payload, productImage);
  }

  @Get()
  @ApiOkResponse({ type: ResponseGetProductDoc })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('price', new ParseIntPipe({ optional: true })) price?: number,
    @Query('name') name: string = '',
  ) {
    return await this.productsService.findAll(page, limit, price, name);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ResponseCreateProductDoc })
  @ApiNotFoundResponse({ type: ResponseNotFoundProductDoc })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiOkResponse({ type: ResponseUpdateProductDoc })
  @ApiNotFoundResponse({ type: ResponseNotFoundProductDoc })
  @UseInterceptors(FileInterceptor('productImage'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
    @UploadedFile() productImage: UploadImageDto,
  ) {
    return await this.productsService.update(id, payload, productImage);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ResponseNotFoundProductDoc })
  @HttpCode(HttpStatus.NO_CONTENT)
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.softDelete(id);
  }

  @Patch(':id/restore')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.admin)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ResponseNotFoundProductDoc })
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.restore(id);
  }

  @Post(':productId/user/:userId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ResponseRedeemProductDoc })
  @ApiNotFoundResponse({ type: ResponseNotFoundProductDoc })
  async redeemProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.productsService.redeemProduct(productId, userId);
  }
}
