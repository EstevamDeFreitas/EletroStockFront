import { ProductDTO } from "src/app/access/models/productDTO.model";

export class ShoppingCartDTO{
  public id : string;
  public customerId : string;
  public cartValidity : Date;
  public shoppingCartItems : ShoppingCartItemDTO[];

  constructor(){
    this.id = '';
    this.customerId = '';
    this.cartValidity = new Date();
    this.shoppingCartItems = [];
  }
}

export class ShoppingCartItemDTO{
  public shoppingCartId : string;
  public productId : string;
  public quantity : number;
  public product !: ProductDTO;

  constructor(){
    this.shoppingCartId = '';
    this.productId = '';
    this.quantity = 0;
  }
}

export class ShoppingCartAddDTO{
  public productId : string;
  public quantity : number;

  constructor(){
    this.productId = '';
    this.quantity = 0;
  }
}
