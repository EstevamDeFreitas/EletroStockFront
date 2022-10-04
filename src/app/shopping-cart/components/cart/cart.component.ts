import { CreditCardService } from './../../../access/services/credit-card/credit-card.service';
import { CreditCardDTO } from './../../../access/models/creditCardDTO.model';
import { AdressDTO } from './../../../access/models/adressDTO.model';
import { AddressService } from './../../../access/services/address/address.service';
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
  public addressList : AdressDTO[] = [];
  public creditCardList :CreditCardDTO[] = []
  public page : string = "shoppingCart";

  constructor(private shoppingCartService : ShoppingCartService, private addressService: AddressService,
    private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.getShoppingCartInfo();
  }

  getShoppingCartInfo() {
    this.shoppingCartService.getCustomerShoppingCart().subscribe(res =>{
      this.shoppingCart = res.data;
    });
  }

  totalShoppingCartValue() {
    let total = 0;

    this.shoppingCart.shoppingCartItems.forEach(cart =>{
      total += cart.quantity * cart.product.price;
    });

    return total;
  }

  lessItem(i: number) {
    this.shoppingCart.shoppingCartItems[i].quantity -= 1;
  }

  moreItem(i: number) {
    this.shoppingCart.shoppingCartItems[i].quantity += 1;
  }

  startPurchase() {
    this.addressService.getUserAdresses().subscribe(res => {
      this.addressList = res.data;

      console.log(this.addressList);
    })

    this.creditCardService.getCustomerCreditCards().subscribe(result => {
      this.creditCardList = result.data;
    })
    this.page = "Purchase";
  }

  selected(e: any, i: number) {
    if(e.target.checked){
      console.log('isChecked',e)
    } else {
      console.log('notChecked',e)
    }
  }
}
