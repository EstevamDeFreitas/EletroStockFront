export class CupomDTO {
  public id: string;
  public name: string;
  public couponType: number;
  public validity: Date;
  public hasValidity: boolean;
  public value: number;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.name = '';
    this.couponType = 0;
    this.validity = new Date();
    this.hasValidity = false;
    this.value = 0;
  }
}

export class CouponCustomerDTO {
  public id: string;
  public customerId: string;
  public couponId: string;
  public valueRemaining: number;

  public coupon!: CupomDTO;

  constructor() {
    this.id = '';
    this.customerId = '';
    this.couponId = '';
    this.valueRemaining = 0;
  }
}
