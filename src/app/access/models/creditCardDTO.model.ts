export class CreditCardDTO{
  public id : string;
  public cardNumber : string;
  public ownerName : string;
  public securityCode : string;
  public customerId : string;
  public cardFlagId : string;
  public cardFlag !: string;

  constructor(){
    this.id = '00000000-0000-0000-0000-000000000000';
    this.cardFlagId = '';
    this.cardNumber = '';
    this.ownerName = '';
    this.securityCode = '';
    this.customerId = '';
  }
}
