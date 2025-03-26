import { Category } from 'src/category/category.entity';
import { BaseEntity } from 'src/common/entities/base.entities';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column()
  description: string;

  @Column()
  weight: number;

  @Column()
  width: number;

  @Column()
  length: number;

  @Column()
  height: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.name, {
    nullable: false,
  })
  @JoinColumn({ name: 'category' })
  category: Category;
}
