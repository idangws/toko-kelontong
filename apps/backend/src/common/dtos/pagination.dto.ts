export class PaginatedResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;

  constructor(data: T[], total: number, page: number, limit: number) {
    this.data = data;
    this.totalItems = total;
    this.currentPage = page;
    this.totalPages = Math.ceil(total / limit);
  }
}
