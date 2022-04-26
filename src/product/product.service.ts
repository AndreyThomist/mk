import { ConflictException, Injectable } from '@nestjs/common';
import { Product } from './entities/Product';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dtos/Product.dto';
import { MetadataAlreadyExistsError } from 'typeorm';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository,
  ) {
   
  }

  async create(product:ProductDto):Promise<Product>{
    const {name,brand,price,seller} = product;
    const foundProduct = await this.productRepository.findOne({
        where:{
            name:name
        }
    })
    if(foundProduct){
        throw new ConflictException("Product Already exists");
    }
    const newProduct = await this.productRepository.save({
        name,
        brand,
        price,
        seller
    })
    return newProduct;
  }

  async update(product:ProductDto, id:string):Promise<Product>{
    const foundProduct = await this.productRepository.findOne({
        where:{
            name:name
        }
    })
    if(foundProduct){
        throw new ConflictException("Product Already exists");
    }

   const updatedProduct = await this.productRepository.save({
        ...product,
        id:id
    })

    return updatedProduct;
  }
}
