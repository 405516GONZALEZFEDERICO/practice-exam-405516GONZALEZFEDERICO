import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Order } from '../models/order';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor() { }

  private apirUrl='http://localhost:3000'

  private readonly http=inject(HttpClient);

  getProductInfo(productId: number) {
    return this.http.get<Product>(`${this.apirUrl}/products/${productId}`);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apirUrl}/products`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apirUrl}/orders`);
  }
  getOrderByEmail(email: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apirUrl}/orders?email=${email}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apirUrl}/orders`, order);
  }
}
