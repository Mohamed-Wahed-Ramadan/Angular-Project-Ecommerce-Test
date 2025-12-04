import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true,
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discount: number): number {
    if (!discount) return price;
    return price - (price * discount / 100);
  }
}
