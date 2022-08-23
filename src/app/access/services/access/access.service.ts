import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/loginDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private readonly API = environment.API_URL + '/access';

  constructor(private http: HttpClient) { }

  loginCustomer(login: LoginDTO){
    return this.http.post<HttpResponse<any>>(this.API + '/login', login);
  }
}
