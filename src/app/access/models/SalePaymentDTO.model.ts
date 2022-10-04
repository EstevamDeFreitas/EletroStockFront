import { CreditCardDTO } from "./creditCardDTO.model";

export class SalePaymentDTO {
  public creditCardId: string;
  public saleId: string;
  public valuePaid: number;
  public creditCard: CreditCardDTO;

  constructor() {
    this.creditCardId = '00000000-0000-0000-0000-000000000000';
    this.saleId = '00000000-0000-0000-0000-000000000000';
    this.valuePaid = 0;
    this.creditCard = new CreditCardDTO();
  }
}
