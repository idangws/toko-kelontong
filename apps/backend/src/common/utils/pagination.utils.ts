import { Repository, FindManyOptions, ObjectLiteral } from 'typeorm';
import { PaginatedResult } from '../dtos/pagination.dto';
import { PaginationOptionsDto } from '../dtos/pagination-options.dto';

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: PaginationOptionsDto,
  findOptions?: FindManyOptions<T>,
): Promise<PaginatedResult<T>> {
  const { page = 1, limit = 10 } = options;

  const [data, total] = await repository.findAndCount({
    skip: (page - 1) * limit,
    take: limit,
    ...findOptions,
  });

  return new PaginatedResult<T>(data, total, page, limit);
}
