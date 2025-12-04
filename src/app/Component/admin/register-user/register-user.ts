import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../Model/user';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUserComponent {
  user: User = {
    fullName: '',
    email: '',
    mobileNumbers: [''],
    password: '',
  };

  submitted = false;

  constructor(private userService: UserService, private router: Router) {}

  get fullName() {
    return this.user.fullName;
  }

  get email() {
    return this.user.email;
  }

  get password() {
    return this.user.password;
  }

  addMobileNumber(): void {
    this.user.mobileNumbers.push('');
  }

  removeMobileNumber(index: number): void {
    // Allow removing only if there are more than 1 numbers
    if (this.user.mobileNumbers.length > 1) {
      this.user.mobileNumbers.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.isFormValid()) {
      this.userService.addUser(this.user).subscribe(
        (response: User) => {
          alert('User registered successfully!');
          this.router.navigate(['/products']);
        },
        (error: any) => {
          console.error('Registration error:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    return (
      this.user.fullName.length >= 5 &&
      this.isValidEmail(this.user.email) &&
      this.user.mobileNumbers.every((m: string) => this.isValidMobile(m)) &&
      this.user.password.length >= 6
    );
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  isValidMobile(mobile: string): boolean {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  }

  getFieldErrors(field: string): string[] {
    const errors: string[] = [];

    if (!this.submitted) return errors;

    if (field === 'fullName') {
      if (!this.user.fullName) errors.push('Full Name is required');
      if (this.user.fullName.length < 5) errors.push('Full Name must be at least 5 characters');
    }

    if (field === 'email') {
      if (!this.user.email) errors.push('Email is required');
      if (this.user.email && !this.isValidEmail(this.user.email)) errors.push('Email format is invalid');
    }

    if (field === 'password') {
      if (!this.user.password) errors.push('Password is required');
      if (this.user.password.length < 6) errors.push('Password must be at least 6 characters');
    }

    return errors;
  }

  getMobileErrors(index: number): string[] {
    const errors: string[] = [];
    if (!this.submitted) return errors;

    const mobile = this.user.mobileNumbers[index];
    if (!mobile) errors.push('Mobile number is required');
    if (mobile && !this.isValidMobile(mobile)) errors.push('Mobile must be 10 digits');

    return errors;
  }
}
