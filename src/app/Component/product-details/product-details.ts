import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Iproduct } from '../../Model/iproduct';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  product: Iproduct | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cd:ChangeDetectorRef) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;
      this.productService.getProductByID(this.productId).subscribe(p => {
        console.log(p);
        
        this.product = p
        this.cd.detectChanges()
    });
    }
  }
}
