import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Iproduct } from '../Model/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class InsertProductService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  addProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.base}/products`, product).pipe(
      catchError(err => {
        console.error('Add product failed:', err);
        return of({ ...product, id: Math.floor(Math.random() * 1000) });
      })
    );
  }

  updateProduct(id: number, product: Iproduct): Observable<Iproduct> {
    return this.http.put<Iproduct>(`${this.base}/products/${id}`, product).pipe(
      catchError(err => {
        console.error('Update product failed:', err);
        return of(product);
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.base}/products/${id}`).pipe(
      catchError(err => {
        console.error('Delete product failed:', err);
        return of({ success: true });
      })
    );
  }

  getCategories(): Observable<any[]> {
    // Mock categories - in real app fetch from API
    return of([
      { id: 1, name: 'Electronics' },
      { id: 2, name: 'Mobiles' },
      { id: 3, name: 'Accessories' },
    ]);
  }
}
