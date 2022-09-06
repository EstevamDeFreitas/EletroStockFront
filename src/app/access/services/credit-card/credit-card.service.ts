import { CreditCardDTO } from './../../models/creditCardDTO.model';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private readonly API = environment.API_URL + "/CreditCard";
  constructor(private http: HttpClient) { }

  getCustomerCreditCards() {
    return this.http.get<HttpResponseBase<CreditCardDTO[]>>(this.API);
  }

}
