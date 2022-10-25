import { CreditCardDTO } from "src/app/access/models/creditCardDTO.model";
import { CustomerDTO } from "src/app/access/models/custumerDTO.model";
import { ProductDTO } from "src/app/access/models/productDTO.model";

export class SaleDTO{
  id : string = '';
  customerId : string = '';
  addressId : string = '';
  saleStatus : SaleStatus = 0;
  saleDate : Date = new Date();
  shipping : number = 0;

  total : number = 0;

  saleItems : SaleItemDTO[] = [];
  salePayments : SalePaymentDTO[] = [];
  saleCoupons : SaleCouponDTO[] = [];
  customer : CustomerDTO = new CustomerDTO();
}

export enum SaleStatus{
  analisys,
  paymentConfirmed,
  transporting,
  delivered,
  finished,
  refundRequested
}

export class SaleItemDTO{
  saleId : string = '';
  productId : string = '';
  refundStatus : RefundStatus = 0;
  unitValue : number = 0;
  quantity : number = 0;
  isSelectedRefund : boolean = false;

  product : ProductDTO = new ProductDTO();
}

export enum RefundStatus{
  none,
  requested,
  refunded,
  finalized,
  rejected
}

export class SalePaymentDTO{
  creditCardId : string = '';
  saleId : string = '';
  valuePaid : number = 0;

  creditCard : CreditCardDTO = new CreditCardDTO();
}

export class SaleCouponDTO{
  couponCustomerId : string = '';
  saleId : string = '';
  discountValue : number = 0;
}

export class SaleItemSummaryDTO{
  saleId : string = '';
  productId : string = '';
}
