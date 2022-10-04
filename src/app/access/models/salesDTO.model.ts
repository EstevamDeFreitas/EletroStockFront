import { SaleCouponDTO } from "./SaleCouponDTO.model";
import { SaleItemDTO } from "./SaleItemDTO.model";
import { SalePaymentDTO } from "./SalePaymentDTO.model";

export class SalesDTO {
  public id: string;
  public customerId: string;
  public addressId: string;
  public saleStatus!: number;
  public saleDate: Date;
  public shipping: number;
  public saleItems: SaleItemDTO[];
  public salePayments: SalePaymentDTO[];
  public saleCoupons!: SaleCouponDTO[];

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.customerId = '00000000-0000-0000-0000-000000000000';
    this.addressId = '00000000-0000-0000-0000-000000000000';
    this.saleDate = new Date();
    this.shipping = 0;
    this.saleItems = [];
    this.salePayments = [];
  }
}

