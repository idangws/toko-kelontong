import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { PaginationOptionsDto } from 'src/common/dtos/pagination-options.dto';
import {
  CreateProductDto,
  ProductParamsDto,
  UpdateProductDto,
} from './product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(
    @Query() PaginationOptions: PaginationOptionsDto,
    @Query() params: ProductParamsDto,
  ) {
    return this.productService.listProducts(PaginationOptions, params);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.detailProduct(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct(id, updateProductDto);
  }
}
