import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Core/Services/api.service';
import { environment } from 'src/app/environment';
import { Product } from '../Interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private endpoint = 'products';

  constructor(private api: ApiService) {}

  // Get all products
  getAll(): Observable<Product[]> {
    return this.api.get<Product[]>(this.endpoint);
  }

  // Get product by ID
  getById(id: number): Observable<Product> {
    return this.api.getById<Product>(this.endpoint, id);
  }

  // Create new product
  create(product: Product): Observable<Product> {
    return this.api.post<Product>(this.endpoint, product);
  }

  // Update product
  update(id: number, product: Product): Observable<Product> {
    return this.api.put<Product>(this.endpoint, id, product);
  }

  // Delete product
  delete(id: number): Observable<void> {
    return this.api.delete<void>(this.endpoint, id);
  }

}
