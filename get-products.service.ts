import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  private url = 'https://msbit-exam-products-store.firebaseio.com/deliveryProducts/products.json ';
  // private temp = 'assets/products.json';

  constructor( private http: HttpClient) { }

  getProducts():Observable<any>{
    return this.http.get<any>(this.url)
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server error");
  }
}
