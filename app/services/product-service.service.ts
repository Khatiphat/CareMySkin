import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Product,ProductDetailServiceApiResponse,ProductReviewServiceApiResponse,ProductServiceApiResponse } from '../models/product-model';
import { Category,CategoryDetailServiceApiResponse,CategoryServiceApiResponse } from '../models/category-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  apiUrl: string = 'http://localhost/caremyskindb/';
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  

  constructor(private httpClient: HttpClient) { }

  inquiryProduct(): Observable<ProductServiceApiResponse> {
    console.log('call inquiryProduct in product-service');
    return this.httpClient
      .post<ProductServiceApiResponse>(this.apiUrl + 'product/product.php', null, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  inquiryCategory(): Observable<CategoryServiceApiResponse> {
    console.log('call inquiryCategory in category-service');
    return this.httpClient
      .post<CategoryServiceApiResponse>(this.apiUrl + 'product/category.php', null, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  addProduct(product: Product): Observable<ProductServiceApiResponse> {
    console.log('call addProduct in product-service');
    return this.httpClient
    .post<ProductServiceApiResponse>(this.apiUrl + 'product/add-product.php', product, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  searchProduct(searchKey : any): Observable<ProductServiceApiResponse> {
    console.log('call inquiryProduct in product-service');
    return this.httpClient
      .post<ProductServiceApiResponse>(this.apiUrl + 'product/search-product.php', {searchKey : searchKey}, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  searchCategory(categoryid : any) : Observable<ProductServiceApiResponse> {
    console.log('call inquiryProduct in product-service');
    return this.httpClient 
      .post<ProductServiceApiResponse>(this.apiUrl + 'product/search-category.php', {categoryid : categoryid}, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
}

  getProductDetail(productID: any): Observable<ProductDetailServiceApiResponse> {
    return this.httpClient.post<ProductDetailServiceApiResponse>(
      this.apiUrl + 'product/inquiry-product.php',
      {
        productid: productID,
      },this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  getCategory(categoryid: any): Observable<CategoryDetailServiceApiResponse> {
    return this.httpClient.post<CategoryDetailServiceApiResponse>(
      this.apiUrl + 'product/inquiry-category.php',
      {
        categoryid: categoryid,
      },this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  inquiryProductReview( productID : any): Observable<ProductReviewServiceApiResponse> {
    console.log('call inquiryReview function in product-service');
    return this.httpClient.post<ProductReviewServiceApiResponse>(
      this.apiUrl + 'review/inquiry-review.php',
      {
        productid: productID,
      },
      this.httpOptions
    )
    .pipe(
      tap((response) => {
        console.log('api response');
        console.log(response);
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}
