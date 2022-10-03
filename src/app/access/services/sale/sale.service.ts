import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleDTO } from 'src/app/customer/models/saledto';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private readonly API = environment.API_URL + "/Sale";

  constructor(private http: HttpClient) { }

  getCustomerSales(){
    return this.http.get<Response<SaleDTO[]>>(this.API);
  }

  getAllSales(){
    return this.http.get<Response<SaleDTO[]>>(this.API + '/all');
  }
}
