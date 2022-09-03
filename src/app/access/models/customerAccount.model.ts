export class CustomerAccountDTO{
  public id : string;
  public customerId : string;
  public defaultChargeAddressId !: string;
  public defaultDeliveryAddressId !: string;
  public defaultCreditCardId !: string;

  constructor(){
    this.id = "";
    this.customerId = "";
  }
}
