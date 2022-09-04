export class AdressDTO {
    public id: string ;
    public addressType: string;
    public streetType: string;
    public description: string;
    public street: string;
    public number: Number;
    public district: string;
    public cep: string;
    public city: string;
    public state: string;
    public country: string;
    public customerId: string;

    constructor() {
        this.id = '00000000-0000-0000-0000-000000000000' ;
        this.addressType = '';
        this.streetType = '';
        this.description = '';
        this.street = '';
        this.number = 0;
        this.district = '';
        this.cep = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.customerId = '';
    }
}
