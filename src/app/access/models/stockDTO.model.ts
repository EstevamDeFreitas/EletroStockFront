import { ProductDTO } from "./productDTO.model";

export class StockDTO {

  public productId: string;
  public sourceName: string;
  public quantity: number;
  public value: number;
  public inputDate: Date;
  public product: ProductDTO;

  constructor() {
    this.productId = '';
    this.sourceName = 'xablau';
    this.quantity = 10;
    this.value = 20;
    this.inputDate = new Date();
    this.product = new ProductDTO();
  }
}
