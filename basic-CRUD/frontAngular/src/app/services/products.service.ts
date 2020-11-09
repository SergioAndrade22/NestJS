import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OktaAuthService } from '@okta/okta-angular';
import { Product } from '../models/product.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public oktaAuth: OktaAuthService, private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {
    const token = await this.oktaAuth.token;

    console.log('User Token:', token)

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
        authorization: `${token}`
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getProducts() {
    return this.request('get', `${baseUrl}/product`);
  }

  getProduct(id: number) {
    return this.request('get', `${baseUrl}/product/${id}`);
  }

  createProduct(product: Product) {
    return this.request('post', `${baseUrl}/product`, product);
  }

  updateProduct(product: Product) {
    return this.request('post', `${baseUrl}/product/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.request('delete', `${baseUrl}/product/${id}`);
  }
}