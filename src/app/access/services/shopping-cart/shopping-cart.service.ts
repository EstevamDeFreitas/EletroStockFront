import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartDTO } from 'src/app/shopping-cart/models/shopping-cart';
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
}
