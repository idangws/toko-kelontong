import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CategoryService } from './category.service';
import { PaginationOptionsDto } from 'src/common/dtos/pagination-options.dto';
import { UpdateCategoryDto } from './category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(@Query() paginationOptions: PaginationOptionsDto) {
    return this.categoryService.findAll(paginationOptions);
  }

  @Post()
  create(@Body() body: { name: string }) {
    return this.categoryService.createCategory(body.name);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategoryById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
