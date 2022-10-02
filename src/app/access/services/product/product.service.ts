import { Response } from './../../models/response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDTO } from '../../models/productDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = environment.API_URL + "/Product";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Response<ProductDTO[]>>(this.API);
  }

  getProduct(id: string) {
    return this.http.get<Response<ProductDTO>>(this.API + '/' + id);
  }

  CreateProduct(product: ProductDTO) {
    return this.http.post<Response<any>>(this.API, product);
  }

  updateProduct(product : ProductDTO){
    return this.http.put<any>(this.API, product);
  }
}
