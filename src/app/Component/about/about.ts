import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  company = {
    name: 'Our Store',
    founded: 2020,
    mission: 'To provide high-quality products at affordable prices with excellent customer service',
    vision: 'To be the leading online retailer in the region',
    description: 'We are committed to excellence in everything we do. Our team works tirelessly to bring you the best shopping experience possible.'
  };

  team = [
    { name: 'Ahmed Hassan', role: 'CEO & Founder', specialty: 'Business Strategy' },
    { name: 'Fatima Al-Ali', role: 'Head of Operations', specialty: 'Supply Chain Management' },
    { name: 'Mohammad Khalid', role: 'Lead Developer', specialty: 'Technology & Innovation' },
    { name: 'Layla Noor', role: 'Customer Service Manager', specialty: 'Customer Relations' },
  ];
}
