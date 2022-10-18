import { ProductDTO } from "./productDTO.model";

export class StockDTO {

  public productId: string;
  public sourceName: string;
  public quantity: number;
  public value: number;
  public inputDate: Date;

  constructor() {
    this.productId = '';
    this.sourceName = '';
    this.quantity = 0;
    this.value = 0;
    this.inputDate = new Date();
  }
}
