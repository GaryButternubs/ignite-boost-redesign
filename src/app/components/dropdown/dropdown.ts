import { Component, input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss'
})
export class Dropdown {
  // If dropdown should appear on-hover
  hoverToggle = input<boolean>(false);
}
