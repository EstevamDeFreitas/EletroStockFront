import { InactiveCategoryDTO } from "./inactiveCategoryDTO.model";

export class InactiveReasonDTO {
  public id: string;
  public inactiveCategoryId: string;
  public description: string;
  public inactiveCategory: InactiveCategoryDTO;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.inactiveCategoryId = '';
    this.description = '';
    this.inactiveCategory = new InactiveCategoryDTO();
  }
}
