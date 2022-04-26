import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductDto } from './dtos/Product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() product: ProductDto) {
    const newProduct = await this.productService.create(product);
    return newProduct;
  }

  @Put('/:id')
  async update(@Body() product: ProductDto, @Param() id: number) {
    const updatedProduct = await this.productService.update(product, id);
    return updatedProduct;
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const product = await this.productService.showOne(id);
    return product;
  }

  @Get()
  async get(
    @Query('name') name: string,
    @Query('price') price: string,
    @Query('seller') seller: string,
    @Query('brand') brand: string,
  ) {
    const products = await this.productService.get(name, price, seller, brand);
    return products;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    return {
      message: 'deleted with success',
    };
  }
}
