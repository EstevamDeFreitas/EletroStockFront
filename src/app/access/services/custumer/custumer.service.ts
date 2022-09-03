import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CustomerDTO } from '../../models/custumerDTO.model';

@Injectable({
  providedIn: 'root'
})

export class CustumerService {

  private readonly API = environment.API_URL + "/Customer";
  constructor(private http: HttpClient) { }

  getCustomersList() {
    return this.http.get<HttpResponse<CustomerDTO[]>>(this.API);
  }

  createCustomer(customerDTO: CustomerDTO) {
    return this.http.post<HttpResponse<string>>(this.API, customerDTO);
  }

  getCustomer(email: string) {
    return this.http.get<HttpResponse<CustomerDTO>>(this.API + "/" + email);
  }

  updateCustomer(customerDTO: CustomerDTO) {
    return this.http.put<HttpResponse<string>>(this.API, customerDTO);
  }

  deleteCustomer(email: string) {
    return this.http.delete<HttpResponse<string>>(this.API+ "/" + email);
  }

  getCustomerDetail(){
    return this.http.get<HttpResponse<CustomerDTO>>(this.API);
  }
}
