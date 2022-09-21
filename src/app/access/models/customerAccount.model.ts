export class CustomerAccountDTO{
  public id : string;
  public customerId : string;
  public defaultChargeAddressId !: string | undefined;
  public defaultDeliveryAddressId !: string | undefined;
  public defaultCreditCardId !: string | undefined;

  constructor(){
    this.id = '00000000-0000-0000-0000-000000000000';
    this.customerId = "";
  }
}
