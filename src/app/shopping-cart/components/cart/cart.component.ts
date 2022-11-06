import { SaleCreateDTO, ValueById } from './../../../access/models/SaleCreateDTO.model';
import { SaleService } from 'src/app/access/services/sale/sale.service';
import { CreditCardService } from './../../../access/services/credit-card/credit-card.service';
import { CreditCardDTO } from './../../../access/models/creditCardDTO.model';
import { AdressDTO } from './../../../access/models/adressDTO.model';
import { AddressService } from './../../../access/services/address/address.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/access/services/shopping-cart/shopping-cart.service';
import { ShoppingCartDTO, ShoppingCartItemDTO } from '../../models/shopping-cart';
import { CouponService } from 'src/app/access/services/coupon/coupon.service';
import { CouponCustomerDTO } from 'src/app/access/models/cupomDTO';

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

  public cupons : CouponCustomerDTO[] = [];

  constructor(private shoppingCartService : ShoppingCartService, private addressService: AddressService,
    private creditCardService: CreditCardService, private saleService: SaleService, private couponService :CouponService) { }

  ngOnInit(): void {
    this.getShoppingCartInfo();
    this.getCustomerCoupons();
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

    this.sale.customerCoupons.forEach(coupon => {
      total -= coupon.value;
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

  selectCoupon(coupon : CouponCustomerDTO){
    let index = this.sale.customerCoupons.findIndex(x => x.id == coupon.id);

    if(index == -1){
      let valueTemp = new ValueById();
      valueTemp.id = coupon.id;
      valueTemp.value = coupon.valueRemaining >= this.totalShoppingCartValue()?this.totalShoppingCartValue() : coupon.valueRemaining;

      this.sale.customerCoupons.push(valueTemp);
    }
    else{
      this.sale.customerCoupons.splice(index, 1);
    }
  }

  isCouponSelected(couponId : string){
    let index = this.sale.customerCoupons.findIndex(x => x.id == couponId);

    return index >= 0;
  }

  getCustomerCoupons(){
    this.couponService.getCustomerCoupons().subscribe(res => {
      this.cupons = res.data;
    })
  }
}
