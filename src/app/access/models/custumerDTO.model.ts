import { AdressDTO } from "./adressDTO.model";
import { CreditCardDTO } from "./creditCardDTO.model";

export class CustomerDTO {
    public email: string;
    public password: string;
    public name: string;
    public gender: string;
    public birthDate: Date;
    public cpf: string;
    public phoneType: string;
    public phoneCode: number;
    public phoneNumber: number;
    public ranking: number;
    public creditCards : Array<CreditCardDTO>;
    public addresses : Array<AdressDTO>;

    constructor() {
      this.email = '';
      this.password = '';
      this.name = '';
      this.gender = '';
      this.birthDate = new Date;
      this.cpf = '';
      this.phoneType = '';
      this.phoneCode = 0;
      this.phoneNumber = 0;
      this.ranking = 0;
      this.creditCards = new Array<CreditCardDTO>();
      this.addresses = new Array
    }
}
