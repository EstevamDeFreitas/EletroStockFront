import { PriceGroupDTO } from './../../models/priceGroupDTO.model';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/response';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn:'root'
})
export class PriceGroupService {

private readonly API = environment.API_URL + "/PriceGroup";

constructor(private http: HttpClient) { }

createPriceGroup(priceGroup: PriceGroupDTO){
  return this.http.post<Response<any>>(this.API, priceGroup);
}

getPriceGroup(id: string) {
  return this.http.get<Response<any>>(this.API + '/' + id);
}

getPriceGroups() {
  return this.http.get<Response<PriceGroupDTO[]>>(this.API);
}

updatePriceGroup(priceGroup: PriceGroupDTO) {
  return this.http.put<Response<any>>(this.API, priceGroup);
}

deletePriceGroup(id: string) {
  return this.http.delete<Response<any>>(this.API + '/' + id);
}

}
