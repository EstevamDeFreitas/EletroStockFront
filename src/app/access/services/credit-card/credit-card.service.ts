import { CustomerDTO } from './../../models/custumerDTO.model';
import { CreditCardDTO } from './../../models/creditCardDTO.model';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private readonly API = environment.API_URL + "/CreditCard";
  constructor(private http: HttpClient) { }

  getCustomerCreditCards() {
    return this.http.get<Response<CreditCardDTO[]>>(this.API);
  }

  createCustomerCreditCard(creditCard: CreditCardDTO) {
    return this.http.post<Response<any>>(this.API, creditCard);
  }

}
