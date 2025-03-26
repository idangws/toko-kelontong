import { IsString, MinLength } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entities';
import { Product } from 'src/product/product.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

export class UpdateCategoryDto {
  @IsString()
  @MinLength(3)
  name: string;
}
