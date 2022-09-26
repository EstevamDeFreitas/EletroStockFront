import { ProductCategoriesDTO } from './productCategoriesDTO.model';
import { InactiveReasonDTO } from "./inactiveReasonDTO.model";
import { ProductImageDTO } from './ProductImageDTO.model';

export class ProductDTO {
  public id: string;
  public code: string;
  public name: string;
  public description: string;
  public priceGroupId: string;
  public inactiveReasonId?: string;
  public inactiveReason?: InactiveReasonDTO;
  public productCategories: ProductCategoriesDTO[];
  public productImages: ProductImageDTO[];

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.code = '';
    this.name = '';
    this.description = '';
    this.priceGroupId = '00000000-0000-0000-0000-000000000000';
    this.inactiveReasonId = '00000000-0000-0000-0000-000000000000';
    this.inactiveReason = new InactiveReasonDTO();
    this.productCategories = [];
    this.productImages = [];
  }
}
