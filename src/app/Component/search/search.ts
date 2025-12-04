import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class SearchComponent {
  @Input() searchValue: string = '';
  @Output() searchChange = new EventEmitter<string>();

  onInputChange(value: string) {
    this.searchChange.emit(value);
  }
}
