import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, UpdateCategoryDto } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async createCategory(name: string): Promise<Category> {
    const existingCategory: Category | null =
      await this.categoryRepository.findOne({ where: { name } });

    if (existingCategory) {
      throw new BadRequestException('Category is exist');
    }

    const category: Category = this.categoryRepository.create({
      name,
    });

    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.update(id, {
      name: updateCategoryDto.name,
    });
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
