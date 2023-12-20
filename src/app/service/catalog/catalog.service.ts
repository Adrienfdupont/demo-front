import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../model/category/category.model";


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private httpClient : HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  createCategory(category: Category) {
    return this.httpClient.post(`${environment.apiUrl}/categories`, category);
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/categories/${id}`);
  }

  updateCategory(category: Category) {
    return this.httpClient.put(`${environment.apiUrl}/categories`, category);
  }
}
