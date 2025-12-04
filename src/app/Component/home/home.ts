import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  title = 'Welcome to Our Store';
  description = 'Shop the best products online with amazing prices and fast delivery!';
  features = [
    { icon: '🚚', title: 'Fast Delivery', description: 'Get your products delivered within 24 hours' },
    { icon: '💰', title: 'Best Prices', description: 'We offer the most competitive prices in the market' },
    { icon: '✅', title: 'Quality Guaranteed', description: 'All products are verified and tested' },
    { icon: '📞', title: '24/7 Support', description: 'Our customer support team is always ready to help' },
  ];
}
