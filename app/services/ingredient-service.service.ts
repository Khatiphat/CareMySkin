import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Ingredient, IngredientServiceApiResponse } from '../models/ingredient-model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngredientServiceService {

  apiUrl: string = 'http://localhost/caremyskindb/';
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  

  constructor(private httpClient: HttpClient) { }

  inquiryIngredient(): Observable<IngredientServiceApiResponse> {
    console.log('call inquiryProduct in product-service');
    return this.httpClient
      .post<IngredientServiceApiResponse>(this.apiUrl + 'product/ingredient.php', null, this.httpOptions)
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
