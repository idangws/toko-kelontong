import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  weight: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  width: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  length: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  height: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  price: number;
}

export class ProductParamsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  category_id: number;

  @IsString()
  @IsOptional()
  name: string;
}

export class UpdateProductDto {
  @IsInt()
  @IsPositive()
  category_id: number;

  @IsString()
  @MinLength(3)
  sku: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  weight: number;

  @IsInt()
  @IsPositive()
  width: number;

  @IsInt()
  @IsPositive()
  length: number;

  @IsInt()
  @IsPositive()
  height: number;

  @IsString()
  image: string;

  @IsInt()
  @IsPositive()
  price: number;
}

export class SaveUpdateProductDtop {
  @IsString()
  @MinLength(3)
  sku: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  weight: number;

  @IsInt()
  @IsPositive()
  width: number;

  @IsInt()
  @IsPositive()
  length: number;

  @IsInt()
  @IsPositive()
  height: number;

  @IsString()
  image: string;

  @IsInt()
  @IsPositive()
  price: number;
}
