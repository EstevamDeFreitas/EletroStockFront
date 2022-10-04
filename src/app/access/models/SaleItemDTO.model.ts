import { ProductDTO } from "./productDTO.model";

export class SaleItemDTO {

  public saleId: string;
  public productId: string;
  public refundStatus!: number;
  public unitValue: number;
  public quantity!: number;
  public product: ProductDTO;

  constructor() {
    this.saleId = '00000000-0000-0000-0000-000000000000';
    this.productId = '00000000-0000-0000-0000-000000000000';
    this.unitValue = 0;
    this.product = new ProductDTO();
  }
}
