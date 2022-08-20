export class CustomerDTO {
    public email: string;
    public password: string;
    public name: string;
    public Gender: string;
    public BirthDate: Date;
    public cpd: string;
    public PhoneType: string;
    public PhoneCode: number;
    public PhoneNumber: number;
    public Ranking: number;

    constructor() {
        this.email = '';
        this.password = '';
        this.name = '';
        this.Gender = '';
        this.BirthDate = new Date;
        this.cpd = '';
        this.PhoneType = '';
        this.PhoneCode = 0;
        this.PhoneNumber = 0;
        this.Ranking = 0;
    }
}