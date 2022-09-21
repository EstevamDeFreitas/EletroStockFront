export class PriceGroupDTO {
  public Id: string;
  public Name: string;
  public Description: string;
  public ProfitMargin: number;

  constructor() {
    this.Id = '00000000-0000-0000-0000-000000000000';
    this.Name = '';
    this.Description = '';
    this.ProfitMargin = 0;
  }
}
