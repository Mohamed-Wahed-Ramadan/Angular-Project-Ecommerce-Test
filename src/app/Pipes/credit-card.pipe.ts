import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'creditCard',
  standalone: true,
})
export class CreditCardPipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) {
      return '';
    }

    const cardNumber = String(value).replace(/\D/g, '');

    if (cardNumber.length !== 16) {
      return String(value);
    }

    // Format as 0000 – 0000 – 0000 – 0000
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 – ');
  }
}
