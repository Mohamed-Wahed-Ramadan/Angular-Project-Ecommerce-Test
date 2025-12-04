// product.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Iproduct } from '../../Model/iproduct';
import { ProductCardDirective } from '../../Directives/product-card.directive';
import { CreditCardPipe } from '../../Pipes/credit-card.pipe';
import { SearchComponent } from '../search/search';
import { CartComponent } from '../cart/cart';
import { DiscountPipe } from '../../Pipes/discount.pipe';
import { ProductService } from '../../Services/product.service';
import { InsertProductService } from '../../Services/insert-product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardDirective,
    CurrencyPipe,
    DatePipe,
    CreditCardPipe,
    SearchComponent,
    CartComponent,
    DiscountPipe,
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  productProp: Iproduct[] = [];
  searchQuery: string = '';
  currentDate: Date = new Date();
  totalPrice: number = 0;
  cardNumber: string = '1234567890123456';
  cart: { product: Iproduct, quantity: number }[] = [];

  constructor(
    private productService: ProductService,
    private insertProductService: InsertProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.productProp = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  addtocart(prd: Iproduct) {
    // ...existing code...
  }

  buyProduct(prd: Iproduct) {
    if (prd.productQuantity > 0) {
      prd.productQuantity--;
      const found = this.cart.find(item => item.product.id === prd.id);
      if (found) {
        found.quantity++;
      } else {
        this.cart.push({ product: prd, quantity: 1 });
      }
    }
  }

  removeFromCart(id: number) {
    const idx = this.cart.findIndex(item => item.product.id === id);
    if (idx > -1) {
      this.cart.splice(idx, 1);
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.insertProductService.deleteProduct(id).subscribe(
        (response) => {
          alert('Product deleted successfully!');
          // Remove from local list
          this.productProp = this.productProp.filter(p => p.id !== id);
        },
        (error) => {
          console.error('Delete failed:', error);
        }
      );
    }
  }

  editProduct(id: number): void {
    this.router.navigate(['/editproduct', id]);
  }

  get filteredProducts(): Iproduct[] {
    if (!this.searchQuery.trim()) {
      return this.productProp;
    }
    return this.productProp.filter(product =>
      product.productName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.productService.searchProducts(value).subscribe(products => {
      this.productProp = products;
    });
  }

  getTotalPrice(): number {
    return this.productProp.reduce(
      (sum, product) => sum + (product.productPrice * product.productQuantity), 
      0
    );
  }
}
