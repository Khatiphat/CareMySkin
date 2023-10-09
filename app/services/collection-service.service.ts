import { Injectable } from '@angular/core';
import { CollectionServiceApiResponse, FavoriteServiceApiResponse } from '../models/collection-model';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionServiceService {

  apiUrl: string = 'http://localhost/caremyskindb/';
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private httpClient: HttpClient) { }

  inquiryCollection(): Observable<CollectionServiceApiResponse> {
    console.log('call inquiryCollection in collection-service');
    return this.httpClient
      .post<CollectionServiceApiResponse>(this.apiUrl + 'collection/collection.php', null, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  inquiryFavorite(memberID: any): Observable<FavoriteServiceApiResponse> {
    console.log('call inquiryFavorite in favorite-service');
    return this.httpClient
      .post<FavoriteServiceApiResponse>(this.apiUrl + 'collection/favorite.php', {
        memberid: memberID,
      }, this.httpOptions)
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


