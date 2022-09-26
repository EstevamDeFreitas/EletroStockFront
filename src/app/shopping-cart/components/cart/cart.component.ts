import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/access/services/shopping-cart/shopping-cart.service';
import { ShoppingCartDTO } from '../../models/shopping-cart';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public shoppingCart : ShoppingCartDTO = new ShoppingCartDTO();

  constructor(private shoppingCartService : ShoppingCartService) { }

  ngOnInit(): void {
    this.getShoppingCartInfo();
  }

  getShoppingCartInfo(){
    this.shoppingCartService.getCustomerShoppingCart().subscribe(res =>{
      this.shoppingCart = res.data;
    });
  }

  totalShoppingCartValue(){
    let total = 0;

    this.shoppingCart.shoppingCartItems.forEach(cart =>{
      total += cart.quantity * cart.product.price;
    });

    return total;
  }

}
