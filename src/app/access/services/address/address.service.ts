import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { AdressDTO } from '../../models/adressDTO.model';
import { Response } from './../../models/response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private readonly API = environment.API_URL + '/Address';

  constructor(private http: HttpClient) { }

  getUserAdresses() {
    return this.http.get<Response<AdressDTO[]>>(this.API + '/list');
  }

  getAddress(adressId: string) {
    return this.http.get<HttpResponse<AdressDTO>>(this.API + '/' + adressId);
  }

  createAddress(address: AdressDTO) {
    return this.http.post<HttpResponse<any>>(this.API, address);
  }

  updateAddress(address: AdressDTO) {
    return this.http.put<HttpResponse<any>>(this.API, address);
  }

  deleteAddress(addressId: string) {
    return this.http.delete<HttpResponse<any>>(this.API + '/' + addressId);
  }
}
