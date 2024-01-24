import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
  //UseInterceptors,
} from '@nestjs/common';
//import { FileInterceptor } from '@nestjs/platform-express';
//import { diskStorage } from 'multer';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
//import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename(req, file, callback) {
  //         const [name, extension] = file.originalname.split('.');

  //         const tempName =
  //           name.split(' ').join('_') + '_' + Date.now() + '.' + extension;

  //         callback(null, tempName);
  //       },
  //     }),
  //     fileFilter(req, file, callback) {
  //       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //         return callback(null, false);
  //       }

  //       return callback(null, true);
  //     },
  //   }),
  // )
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
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
