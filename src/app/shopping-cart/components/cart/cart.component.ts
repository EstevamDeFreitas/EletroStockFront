import { SaleCreateDTO, ValueById } from './../../../access/models/SaleCreateDTO.model';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { CreditCardService } from './../../../access/services/credit-card/credit-card.service';
import { CreditCardDTO } from './../../../access/models/creditCardDTO.model';
import { AdressDTO } from './../../../access/models/adressDTO.model';
import { AddressService } from './../../../access/services/address/address.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/access/services/shopping-cart/shopping-cart.service';
import { ShoppingCartDTO, ShoppingCartItemDTO } from '../../models/shopping-cart';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public shoppingCart : ShoppingCartDTO = new ShoppingCartDTO();
  public sale: SaleCreateDTO = new SaleCreateDTO();
  public valuebyId: ValueById = new ValueById();
  public value: number = 0;
  public addressList : AdressDTO[] = [];
  public creditCardList :CreditCardDTO[] = []
  public page : string = "shoppingCart";

  constructor(private shoppingCartService : ShoppingCartService, private addressService: AddressService,
    private creditCardService: CreditCardService, private saleService: SaleService) { }

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

  createSale(){
    this.sale.shipping = 40;
    this.sale.shoppingCartId = this.shoppingCart.id;
    this.saleService.createCustomerSale(this.sale).subscribe()
  }

  lessItem(i: number) {
    this.shoppingCart.shoppingCartItems[i].quantity -= 1;
    this.shoppingCartService.updateShoppingCartItem(this.shoppingCart.shoppingCartItems[i]).subscribe(res => {
      if(res.message ='Item Updated'){
        this.getShoppingCartInfo();
      }
    });
  }

  moreItem(i: number) {
    this.shoppingCart.shoppingCartItems[i].quantity += 1;
    this.shoppingCartService.updateShoppingCartItem(this.shoppingCart.shoppingCartItems[i]).subscribe(res => {
      if(res.message ='Item Updated'){
        this.getShoppingCartInfo();
      }
    });
  }

  startPurchase() {
    this.addressService.getUserAdresses().subscribe(res => {
      this.addressList = res.data;
    })

    this.creditCardService.getCustomerCreditCards().subscribe(result => {
      this.creditCardList = result.data;
    })
    this.page = "Purchase";
  }

  getValue(value: number) {
    this.valuebyId.value = value;
  }

  selected(e: any, i: number, type: string) {

    if(e.target.checked){
      if (type === 'address') {
        this.sale.addressId = this.addressList[i].id;
      }

      if (type === 'creditCard') {
        this.valuebyId = new ValueById();
        this.valuebyId.id = this.creditCardList[i].id;
        this.sale.creditCards.push(this.valuebyId)
        console.log(this.sale.creditCards);
      }

    } else {
      if (type === 'address') {
        this.sale.addressId = '00000000-0000-0000-0000-000000000000';
      }

      if (type === 'creditCard') {
        let index = this.sale.creditCards.findIndex(x=>{x.id == this.creditCardList[i].id});
        this.sale.creditCards.splice(index, 1);
      }
    }
  }
}
