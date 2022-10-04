
export class SaleCreateDTO
{
  public shoppingCartId: string;
  public addressId: string;
  public shipping: number;
  public creditCards: ValueById[];
  public customerCoupons!: ValueById[];

  constructor() {
    this.shoppingCartId = '';
    this.addressId = '';
    this.shipping = 0;
    this.creditCards = [];
  }
}

class ValueById
{
  public id: string;
  public value: number;

  constructor() {
    this.id = '';
    this.value = 0;
  }
}
