import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column({
    type: 'double',
  })
  price: number;
  @Column()
  seller: string;
}
