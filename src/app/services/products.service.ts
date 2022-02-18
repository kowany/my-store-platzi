import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { retry, catchError, map } from 'rxjs/operators'
import { throwError, zip } from 'rxjs'

import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';

import { environment } from './../../environments/environment';

import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api`

  constructor( private http: HttpClient ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params: HttpParams = new HttpParams();
    if (typeof limit === "number" && typeof offset === "number" ) {
      params = params.append('limit', typeof limit === "number"? limit.toString() : "0");
      params = params.append('offset', typeof offset === "number"? offset.toString() : "10");
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/products`, { params })
  }

  getAllProducts(limit?: number, offset?: number) {
    let params: HttpParams = new HttpParams();
    if (typeof limit === "number" && typeof offset === "number" ) {
      params = params.append('limit', typeof limit === "number"? limit.toString() : "0");
      params = params.append('offset', typeof offset === "number"? offset.toString() : "10");
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params, context: checkTime() })
            .pipe(
              retry(3),
              map( products => products.map( item => {
                return {
                  ...item,
                  taxes: .15 * item.price
                }
              }))
            );
  }

  fetchReaAndUpdate( id: string, dto: UpdateProductDTO ) {
    return zip(
      this.getOne(id),
      this.update( id, dto )
    );
  }

  getOne( id: string ) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
              .pipe(
                catchError((error:HttpErrorResponse) => {
                  if ( error.status === HttpStatusCode.Conflict ) {
                    return throwError(() => new Error(
                      'Algo está fallando en el server'
                    ));
                  }
                  if ( error.status === HttpStatusCode.NotFound ) {
                    console.log( 'desde el serviccio');
                    return throwError(() => new Error(
                      'El producto no existe'
                    ));
                  }
                  if ( error.status === HttpStatusCode.Unauthorized ) {
                    return throwError(() => new Error(
                      'No estás autorizado para estar aquí'
                    ));
                  }
                  return throwError(() => new Error(
                    'Ups, algp salió mal'
                  ));
                })
              )
  }

  create( dto: CreateProductDTO ) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update( id: string, dto: UpdateProductDTO ) {
    // con put deberíamos enviar toda la información
    // aunque solo hayamos cambiado un dato.
    // con patch sirve para hacer la edición de un
    // atributo en particular
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete( id: string ) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
