import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Iproduct } from '../../Model/iproduct';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  @Input() cart: { product: Iproduct, quantity: number }[] = [];
  @Output() remove = new EventEmitter<number>();

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
  }

  constructor(private router: Router) {}

  removeItem(id: number) {
    this.remove.emit(id);
  }

  goToDetails(id: number) {
    this.router.navigate(['/products', id]).then(ok => console.log('navigated to product', id, ok));
  }
}
