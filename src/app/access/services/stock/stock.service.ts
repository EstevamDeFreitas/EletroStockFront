import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/response';
import { StockDTO } from '../../models/stockDTO.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

private readonly API = environment.API_URL + "/Stock";

constructor(private http: HttpClient) { }

  getStocks(){
    return this.http.get<Response<StockDTO[]>>(this.API);
  }

  createStock(stock: StockDTO){
    return this.http.post<Response<any>>(this.API, stock);
  }

  getStocksByProducts(){
    return this.http.get<Response<any[]>>(this.API + '/product');
  }

}
