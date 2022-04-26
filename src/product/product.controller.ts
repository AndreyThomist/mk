import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
  async update(@Body() product: ProductDto, @Param() id: string) {
    const updatedProduct = await this.productService.update(product, id);
    return updatedProduct;
  }

  @Get('/:id')
  async show(@Param() id:string){
      const product = await this.productService.showOne(id)
      return product;
  }

  @Delete('/:id')
  async delete(@Param() id: string) {
    await this.productService.delete(id);
    return {
      message: 'deleted with success',
    };
  }
}
