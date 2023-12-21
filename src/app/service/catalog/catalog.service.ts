import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Category} from "../../model/category/category.model";
import {Distribution} from "../../model/distribution/distribution.model";


@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private httpClient : HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiUrl}/categories`);
  }

  createCategory(category: Category) {    
    return this.httpClient.post<Category>(`${environment.apiUrl}/categories`, category.serialize());
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.apiUrl}/categories/${id}`);
  }

  updateCategory(category: Category) {
    return this.httpClient.put<Category>(`${environment.apiUrl}/categories`, category.serialize());
  }

  createDistribution(distribution: Distribution) {    
    return this.httpClient.post<Distribution>(`${environment.apiUrl}/distributions`, distribution.serialize());
  }

  deleteDistribution(id: number) {  
    return this.httpClient.delete(`${environment.apiUrl}/distributions/${id}`);
  }
}
