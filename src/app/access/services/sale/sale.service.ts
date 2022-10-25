import { SaleCreateDTO } from './../../models/SaleCreateDTO.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefundStatus, SaleDTO, SaleItemSummaryDTO, SaleStatus } from 'src/app/customer/models/saledto';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private readonly API = environment.API_URL + "/Sale";

  constructor(private http: HttpClient) { }

  createCustomerSale(saleCreate: SaleCreateDTO){
    return this.http.post<Response<any>>(this.API, saleCreate);
  }

  getCustomerSales(){
    return this.http.get<Response<SaleDTO[]>>(this.API);
  }

  getAllSales(){
    return this.http.get<Response<SaleDTO[]>>(this.API + '/all');
  }

  changeStatus(saleId : string, value:SaleStatus){
    return this.http.put<Response<SaleDTO[]>>(this.API+'/'+saleId+'?saleStatus='+value, undefined);
  }

  requestRefund(saleItems : SaleItemSummaryDTO[]){
    return this.http.post<Response<any>>(this.API + '/refund', saleItems);
  }

  getSale(saleId : string){
    return this.http.get<Response<SaleDTO>>(this.API + '/' + saleId);
  }

  changeRefundStatus(saleItem : SaleItemSummaryDTO, status : RefundStatus){
    return this.http.put<Response<any>>(this.API + '/refund?refundStatus='+status, saleItem);
  }

  acceptInventory(saleItem : SaleItemSummaryDTO){
    return this.http.put<any>(this.API + '/refund/inventory', saleItem);
  }
}
