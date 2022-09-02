import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginDTO } from '../../models/loginDTO.model';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private readonly API = environment.API_URL + '/Access';

  constructor(private http: HttpClient) { }

  loginCustomer(login: LoginDTO){
    return this.http.post<HttpResponse<any>>(this.API + '/login', login);
  }

  //Valido para customer e user(administrativo)
  static getUser() : string | null{
    return localStorage.getItem('userId');
  }

  //Valido para customer e user(administrativo)
  static setUser(userId : string){
    localStorage.setItem('userId', userId);
  }
}
