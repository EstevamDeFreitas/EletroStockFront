export class PriceGroupDTO {
  public id: string;
  public name: string;
  public description: string;
  public profitMargin: number;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.name = '';
    this.description = '';
    this.profitMargin = 0;
  }
}
