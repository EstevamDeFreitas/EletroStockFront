import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CardFlagDTO } from '../../models/cardFlagDTO.model';
import { Response } from '../../models/response';

@Injectable({
  providedIn: 'root'
})
export class CardFlagService {

  private readonly API = environment.API_URL + "/CardFlag";
  constructor(private http: HttpClient) { }

  getCardFlags(){
    return this.http.get<Response<CardFlagDTO[]>>(this.API);
  }

  getCardFlag(id : string){
    return this.http.get<Response<CardFlagDTO>>(this.API + `/${id}`);
  }

  updateCardFlag(cardFlag : CardFlagDTO){
    return this.http.put<Response<any>>(this.API, cardFlag);
  }

  createCardFlag(flagName : string){
    return this.http.post<Response<any>>(this.API, flagName);
  }
}
