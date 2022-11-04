import { CouponCustomerDTO } from './../../models/cupomDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CupomDTO } from '../../models/cupomDTO';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})

export class CouponService {

  private readonly API = environment.API_URL + "/Coupon";
  constructor(private http: HttpClient) { }

  getCoupons(){
    return this.http.get<Response<CupomDTO[]>>(this.API);
  }

  getCustomerCoupons(){
    return this.http.get<Response<CouponCustomerDTO[]>>(this.API + '/customer');
  }

  createCoupon(cupom: CupomDTO){
    return this.http.post<Response<any>>(this.API, cupom);
  }

  updateCoupon(cupom: CupomDTO){
    return this.http.put<Response<any>>(this.API, cupom)
  }

  deleteCoupon(id: string){
    return this.http.delete<Response<any>>(this.API + "/" + id);
  }

  // updateCouponPost(){
  //   return this.http.post<Response<any>>(this.API);
  // }

}
