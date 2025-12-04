import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Iproduct } from '../Model/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(`${this.base}/products`).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        throw error; 
      })
    );
  }

  getProductByID(id: number): Observable<Iproduct | null> {
    return this.http.get<Iproduct>(`${this.base}/products/${id}`).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        throw error;
      })
    );
  }

  // simple search using query param (json-server supports q and _like)
//   searchProducts(term: number): Iproduct | undefined {
//     if (!term || term.trim() === '') {
//       return this.getAllProducts();
//     }
//     return this.http.get<Iproduct[]>(`${this.base}/products?productName_like=${encodeURIComponent(term)}`).pipe(
//       catchError(() => {
//         const lower = term.toLowerCase();
//         return of(this.localProducts.filter(p => p.productName.toLowerCase().includes(lower)));
//       })
//     );
//   }
    
    // simple search using query param (json-server supports q and _like)
    searchProducts(term: string): Observable<Iproduct[]> {
      if (!term || term.trim() === '') {
        return this.getAllProducts();
      }
      const q = encodeURIComponent(term);
      return this.http.get<Iproduct[]>(`${this.base}/products?productName_like=${q}`).pipe(
        catchError((error) => {
          console.error('Search API Error:', error);
          throw error;
        })
      );
    }
  }
