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
    }
}
