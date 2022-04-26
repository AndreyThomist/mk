import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dtos/Product.dto';
import { Repository } from 'typeorm';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async get(
    name: string,
    price: string,
    seller: string,
    brand: string,
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository.createQueryBuilder('products');
    if (name) {
      queryBuilder.andWhere('products.name like :name', { name: `%${name}%` });
    }
    if (brand) {
      queryBuilder.andWhere('products.brand like :brand', {
        brand: `%${brand}%`,
      });
    }
    if (price) {
      queryBuilder.andWhere('products.price = :price', { price: price });
    }
    if (seller) {
      queryBuilder.andWhere('products.seller like :seller', {
        seller: `%${seller}%`,
      });
    }
    const products = await queryBuilder.getMany();
    return products;
  }

  async showOne(id: number): Promise<Product> {
    const foundProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundProduct) {
      throw new NotFoundException('product not found');
    }
    return foundProduct;
  }

  async update(product: ProductDto, id: number): Promise<Product> {
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

  async delete(id: number): Promise<void> {
    const foundProduct = await this.productRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!foundProduct) {
      throw new NotFoundException('product not found');
    }
    await this.productRepository.remove(foundProduct);
  }
}
