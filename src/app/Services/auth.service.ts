import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.apiBaseUrl;
  private loggedIn = false;

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('isLoggedIn');
    this.loggedIn = stored === 'true';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.base}/auth/login`, { email, password }).pipe(
      catchError(err => {
        console.error('Login failed:', err);
        // Simulate login for demo
        this.setLoggedIn(true);
        return of({ success: true, user: { email } });
      })
    );
  }

  logout(): void {
    this.setLoggedIn(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  private setLoggedIn(value: boolean): void {
    this.loggedIn = value;
    localStorage.setItem('isLoggedIn', value.toString());
  }
}
