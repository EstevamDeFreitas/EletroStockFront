
export class SaleCreateDTO
{
  public shoppingCartId: string;
  public addressId: string;
  public shipping: number;
  public creditCards: ValueById[];
  public customerCoupons!: ValueById[];

  constructor() {
    this.shoppingCartId = '00000000-0000-0000-0000-000000000000';
    this.addressId = '00000000-0000-0000-0000-000000000000';
    this.shipping = 0;
    this.creditCards = [];
  }
}

export class ValueById
{
  public id: string;
  public value: number;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.value = 0;
  }
}
