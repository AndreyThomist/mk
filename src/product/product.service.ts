import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dtos/Product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    const { name, brand, price, seller } = product;
    const foundProduct = await this.productRepository.findOne({
      where: {
        name: name,
      },
    });
    if (foundProduct) {
      throw new ConflictException('Product Already exists');
    }
    const newProduct = await this.productRepository.save({
      name,
      brand,
      price,
      seller,
    });
    return newProduct;
  }

  async showOne(id:string): Promise<Product>{
    const foundProduct = await this.productRepository.findOne({
        where:id,
     });
     if (!foundProduct) {
        throw new NotFoundException('product not found');
     }
     return foundProduct;
  }

  async update(product: ProductDto, id: string): Promise<Product> {
    const foundProduct = await this.productRepository.findOne({
      where: {
        name: product.name,
      },
    });
    if (foundProduct) {
      throw new ConflictException('Product Already exists');
    }

    await this.productRepository.update(id, {
      ...product,
    });

    const updatedProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const foundProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundProduct) {
      throw new NotFoundException('product not found');
    }
    await this.productRepository.remove(id);
    return foundProduct;
  }
}
