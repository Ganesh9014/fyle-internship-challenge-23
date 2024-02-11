import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.github.com';

  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    const url = `${this.apiUrl}/users/${githubUsername}`;
    return this.httpClient.get<any>(url).pipe(catchError(this.handleError));
  }

  getRepos(
    githubUsername: string,
    page: number = 1,
    pageSize: number = 10
  ): Observable<any[]> {
    const url = `${this.apiUrl}/users/${githubUsername}/repos`;
    const params = {
      page: page.toString(),
      per_page: pageSize.toString(),
    };

    return this.httpClient.get<any[]>(url, { params }).pipe(
      tap((data) => console.log('Repos API Response:', data)),
      catchError((error) => {
        console.error('Repos API Error:', error);
        return this.handleError(error);
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}
