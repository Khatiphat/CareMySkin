import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Member,MemberDetailServiceApiResponse,MemberServiceApiResponse } from '../models/member-model';
import { tap } from 'rxjs/operators';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class MemberServiceService {

  apiUrl: string = 'http://localhost/caremyskindb/';
  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  

  constructor(private httpClient: HttpClient) { }

  inquiryMember(): Observable<MemberServiceApiResponse> {
    console.log('call inquiryMember in member-service');
    return this.httpClient
      .post<MemberServiceApiResponse>(this.apiUrl + 'member/member.php', null, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  addMember(member: Member): Observable<MemberServiceApiResponse> {
    console.log('call addMember in member-service');
    return this.httpClient
    .post<MemberServiceApiResponse>(this.apiUrl + 'function/register.php', member, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  deleteMember(memberID: any): Observable<MemberServiceApiResponse> {
    console.log('call deleteMember in member-service');
    return this.httpClient
    .post<MemberServiceApiResponse>(this.apiUrl + 'member/delete-member.php', { memberid : memberID}, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  getMemberDetail(memberID: number) {
    return this.httpClient.post<MemberDetailServiceApiResponse>(
      this.apiUrl + 'member/inquiry-member.php',
      {
        memberid: memberID,
      },this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  updateMember(member : Member): Observable<MemberServiceApiResponse> {
    console.log('call updateMember in member-service');
    return this.httpClient
    .post<MemberServiceApiResponse>(this.apiUrl + 'member/update-member.php', member, this.httpOptions)
      .pipe(
        tap((response) => {
          console.log('api response');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  loginMember(loginEmail: string, loginPassword: string): Observable<MemberDetailServiceApiResponse> {
    console.log('call login in member-service');
    return this.httpClient
    .post<MemberDetailServiceApiResponse>(this.apiUrl + 'function/login.php', {email: loginEmail,password: loginPassword,}, this.httpOptions)
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
