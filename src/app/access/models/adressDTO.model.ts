export class AdressDTO {
    public Id: string ;
    public AddressType: string;
    public StreetType: string;
    public Description: string;
    public Street: string;
    public Number: Number;
    public District: string;
    public CEP: string;
    public City: string;
    public State: string;
    public Country: string;
    public CustomerId: string;

    constructor() {
        this.Id = '' ;
        this.AddressType = '';
        this.StreetType = '';
        this.Description = '';
        this.Street = '';
        this.Number = 0;
        this.District = '';
        this.CEP = '';
        this.City = '';
        this.State = '';
        this.Country = '';
        this.CustomerId = '';
    }
}
