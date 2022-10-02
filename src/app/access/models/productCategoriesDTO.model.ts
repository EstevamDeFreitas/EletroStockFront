import { CategoryDTO } from "./categoryDTO.model";

export class ProductCategoriesDTO {
  public productId: string;
  public categoryId: string;
  public category!: CategoryDTO;

  constructor() {
    this.productId = '00000000-0000-0000-0000-000000000000';
    this.categoryId = '00000000-0000-0000-0000-000000000000';
  }
}
