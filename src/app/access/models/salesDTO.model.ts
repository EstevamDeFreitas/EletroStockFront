import { SaleCouponDTO } from "./SaleCouponDTO.model";
import { SaleItemDTO } from "./SaleItemDTO.model";
import { SalePaymentDTO } from "./SalePaymentDTO.model";

export class SalesDTO {
  public id: string;
  public customerId: string;
  public addressId: string;
  // public saleStatus: SaleStatus;
  public saleDate: Date;
  public shipping: number;
  public saleItems: SaleItemDTO[];
  public salePayments: SalePaymentDTO[];
  public saleCoupons!: SaleCouponDTO[];

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.customerId = '00000000-0000-0000-0000-000000000000';
    this.addressId = '00000000-0000-0000-0000-000000000000';
   // this.saleStatus = new SaleStatus();
    this.saleDate = new Date();
    this.shipping = 0;
    this.saleItems = [];
    this.salePayments = [];
  }
}

class SaleCreateDTO
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
