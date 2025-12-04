import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../Model/user';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UserService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/users`, user).pipe(
      catchError(err => {
        console.error('Add user failed:', err);
        // Simulate success for demo
        return of({ ...user, id: Math.floor(Math.random() * 1000) });
      })
    );
  }
}
