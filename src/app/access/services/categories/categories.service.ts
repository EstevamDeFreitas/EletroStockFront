import { CategoryDTO } from '../../models/categoryDTO.model';
import { Response } from '../../models/response';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  private readonly API = environment.API_URL + '/Category';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Response<CategoryDTO[]>>(this.API);
  }

  getCategory(id: string) {
    return this.http.get<Response<CategoryDTO>>(this.API + '/' + id);
  }

  createCategory(category: CategoryDTO) {
    return this.http.post<Response<any>>(this.API, category);
  }

  updateCategory(category: CategoryDTO) {
    return this.http.put<Response<any>>(this.API, category);
  }

  deleteCategory(id: string) {
    return this.http.delete<Response<CategoryDTO>>(this.API + '/' + id);
  }

}
