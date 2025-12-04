import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../Model/iproduct';
import { InsertProductService } from '../../Services/insert-product.service';
import { ProductService } from '../../Services/product.service';

@Component({
  selector: 'app-insert-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './insert-product.html',
  styleUrl: './insert-product.css',
})
export class InsertProductComponent implements OnInit {
  form!: FormGroup;
  categories: any[] = [];
  submitted = false;
  editMode = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private insertProductService: InsertProductService,
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.checkEditMode();
  }

  initForm(): void {
    this.form = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      productPrice: [0, [Validators.required, Validators.min(1)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      productQuantity: [0, [Validators.required, Validators.min(0)]],
      catatId: ['', Validators.required],
      productsDetails: ['', Validators.required],
      productImgURl: ['', Validators.required],
    });
  }

  loadCategories(): void {
    this.insertProductService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => console.error('Failed to load categories', error)
    );
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.productId = +id;
        this.loadProductForEdit(this.productId);
      }
    });
  }

  loadProductForEdit(id: number): void {
    this.productService.getProductByID(id).subscribe(
      (product) => {
        if (product) {
          this.form.patchValue(product);
        }
      },
      (error) => console.error('Failed to load product', error)
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const product: Iproduct = this.form.value;

    if (this.editMode && this.productId) {
      this.insertProductService.updateProduct(this.productId, product).subscribe(
        (response) => {
          alert('Product updated successfully!');
          this.router.navigate(['/products']);
        },
        (error) => console.error('Update failed', error)
      );
    } else {
      this.insertProductService.addProduct(product).subscribe(
        (response) => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        (error) => console.error('Add failed', error)
      );
    }
  }

  get productName() {
    return this.form.get('productName');
  }

  get productPrice() {
    return this.form.get('productPrice');
  }

  get discount() {
    return this.form.get('discount');
  }

  get productQuantity() {
    return this.form.get('productQuantity');
  }

  get catatId() {
    return this.form.get('catatId');
  }

  get productsDetails() {
    return this.form.get('productsDetails');
  }

  get productImgURl() {
    return this.form.get('productImgURl');
  }
}
