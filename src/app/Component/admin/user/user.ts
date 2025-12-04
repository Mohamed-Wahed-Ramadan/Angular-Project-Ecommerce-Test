import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class UserComponent {
  adminLinks = [
    { label: 'Register User', route: '/admin/signup' },
    { label: 'Insert Product', route: '/insertproduct' },
  ];
}
