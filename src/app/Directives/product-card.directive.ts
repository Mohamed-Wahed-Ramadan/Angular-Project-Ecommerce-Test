import {
  Directive,
  HostListener,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  Input,
} from '@angular/core';


@Directive({
  selector: '[appProductCard]',
  standalone: true,
})
export class ProductCardDirective implements OnChanges {
  @Input() cardStyle: string = 'default'; // Can be extended for future use

  private initialShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  private hoverShadow = '0 12px 24px rgba(0, 0, 0, 0.4)';

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.applyStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cardStyle']) {
      this.applyStyles();
    }
  }

  private applyStyles(): void {
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '12px');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.initialShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.hoverShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-5px)');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', this.initialShadow);
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
  }
}
