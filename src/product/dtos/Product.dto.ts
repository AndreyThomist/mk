import { IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;
  @IsString()
  brand: string;
  @IsNumber()
  price: number;
  @IsString()
  seller: string;
}
