import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Product } from './product.entity';
import { Category } from '../category/category.entity';
import {
  CreateProductDto,
  ProductParamsDto,
  UpdateProductDto,
} from './product.dto';
import { PaginationOptionsDto } from 'src/common/dtos/pagination-options.dto';
import { PaginatedResult } from 'src/common/dtos/pagination.dto';
import { paginate } from 'src/common/utils/pagination.utils';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.category_id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const productExist = await this.productRepository.findOne({
      where: { sku: dto.sku },
    });
    if (productExist) {
      throw new BadRequestException('SKU is already exist');
    }

    const product = this.productRepository.create({ ...dto, category });
    await this.productRepository.save(product);

    return {
      category_id: category.id,
      category_name: category.name,
      sku: product.sku,
      name: product.name,
      description: product.description,
      weight: product.weight,
      width: product.width,
      length: product.length,
      height: product.height,
      image: product.image,
      price: product.price,
    };
  }

  async listProducts(
    options: PaginationOptionsDto,
    params: ProductParamsDto,
  ): Promise<PaginatedResult<Product>> {
    const where: FindOptionsWhere<Product> = {};

    if (params?.name) {
      where.name = Like(`%${params?.name}`);
    }
    if (params?.category_id) {
      where.category = { id: params?.category_id };
    }
    return paginate(this.productRepository, options, {
      relations: ['category'],
      where,
    });
  }

  async detailProduct(id: number): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: updateProductDto.category_id },
    });
    if (!category) {
      throw new BadRequestException('Invalid category_id');
    }

    await this.productRepository.update(id, {
      sku: updateProductDto.sku,
      name: updateProductDto.name,
      description: updateProductDto.description,
      weight: updateProductDto.weight,
      width: updateProductDto.width,
      length: updateProductDto.length,
      height: updateProductDto.height,
      image: updateProductDto.image,
      price: updateProductDto.price,
      category,
    });

    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }
}
