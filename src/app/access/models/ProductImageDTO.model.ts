export class ProductImageDTO {
  public id: string;
  public productId: string;
  public imageUrl: string;

  constructor() {
    this.id = '00000000-0000-0000-0000-000000000000';
    this.productId = '00000000-0000-0000-0000-000000000000';
    this.imageUrl = '';
  }
}
