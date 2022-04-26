import { Body, Controller, Param, Post } from '@nestjs/common';
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

  async update(@Body() product: ProductDto, @Param() id:string){
    const updatedProduct = await this.productService.update(product,id);
    return updatedProduct;
  }
}
