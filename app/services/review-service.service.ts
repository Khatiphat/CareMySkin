import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReportReviewServiceApiResponse, Review } from '../models/product-model';
import { ProductReviewServiceApiResponse } from '../models/product-model';
import { AddReview } from '../models/review-model';
import { AddReviewServiceApiResponse } from '../models/review-model';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  apiUrl: string = 'http://localhost/caremyskindb/';
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private httpClient: HttpClient) { }

  // reviewProduct(review : Review): Observable<ReviewServiceApiResponse> {
  //   console.log('call reviewProduct in review-service');
  //   return this.httpClient
  //   .post<ReviewServiceApiResponse>(this.apiUrl + 'member/create-review.php', review, this.httpOptions)
  //     .pipe(
  //       tap((response) => {
  //         console.log('api response');
  //         console.log(response);
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
  sendReportReview(reviewid : number, memberid: number, reason: string): Observable<ReportReviewServiceApiResponse> {
    console.log('call sendReportReview in review-service');
    return this.httpClient
    .post<ReportReviewServiceApiResponse>(this.apiUrl + 'review/send-report.php', {reviewid: reviewid, memberid:memberid, reason:reason}, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  addReview(review : AddReview ,productid : number, memberid: number): Observable<AddReviewServiceApiResponse> {
    console.log('call sendReportReview in review-service');
    return this.httpClient
    .post<AddReviewServiceApiResponse>(this.apiUrl + 'review/create-review.php', {review: review, memberid:memberid, productid:productid}, this.httpOptions)
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
