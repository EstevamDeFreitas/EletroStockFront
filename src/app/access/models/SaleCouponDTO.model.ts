import { DecimalPipe } from "@angular/common";

export class SaleCouponDTO {
  public couponCustomerId: string;
  public saleId: string;
  public discountValue: number;

  constructor() {
    this.couponCustomerId = '00000000-0000-0000-0000-000000000000';
    this.saleId = '00000000-0000-0000-0000-000000000000';
    this.discountValue = 0;
  }
}
