import { Routes } from '@angular/router';
import { Home } from './Component/home/home';
import { AboutComponent } from './Component/about/about';
import { Product } from './Component/product/product';
import { ProductDetailsComponent } from './Component/product-details/product-details';
import { NotFoundComponent } from './Component/not-found/not-found';
import { LoginComponent } from './Component/login/login';
import { RegisterUserComponent } from './Component/admin/register-user/register-user';
import { UserComponent } from './Component/admin/user/user';
import { InsertProductComponent } from './Component/insert-product/insert-product';
import { AuthGuard } from './Guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
    data: { title: 'Home' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About Us' },
  },
  {
    path: 'products',
    component: Product,
    data: { title: 'Products' },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { title: 'Product Details' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'admin',
    component: UserComponent,
    data: { title: 'Admin' },
  },
  {
    path: 'admin/signup',
    component: RegisterUserComponent,
    data: { title: 'Register User' },
  },
  {
    path: 'insertproduct',
    component: InsertProductComponent,
    canActivate: [AuthGuard],
    data: { title: 'Insert Product' },
  },
  {
    path: 'editproduct/:id',
    component: InsertProductComponent,
    canActivate: [AuthGuard],
    data: { title: 'Edit Product' },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
