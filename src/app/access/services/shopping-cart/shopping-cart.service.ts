import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartAddDTO, ShoppingCartDTO, ShoppingCartItemDTO } from 'src/app/shopping-cart/models/shopping-cart';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private readonly API = environment.API_URL + "/ShoppingCart";

  constructor(private http: HttpClient) { }

  public getCustomerShoppingCart() : Observable<Response<ShoppingCartDTO>>{
    return this.http.get<any>(this.API);
  }

  public addToCart(product : ShoppingCartAddDTO){
    return this.http.post<any>(this.API + '/add', product);
  }

  public updateShoppingCartItem(shoppingCardItem: ShoppingCartItemDTO ){
    return this.http.put<Response<any>>(this.API, shoppingCardItem);
  }
}
