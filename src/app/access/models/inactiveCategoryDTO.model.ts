export class InactiveCategoryDTO {
  public id: string;
  public name: string;
  public description: string;
  public active: boolean;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.name = '';
    this.description = '';
    this.active = false;
  }
}
