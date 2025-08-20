import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { Character, AssistCharacters } from '../../../../../api/Characters';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assist-menu',
  imports: [NgOptimizedImage, NgClass, MatProgressSpinnerModule],
  templateUrl: './assist-menu.html',
  styleUrl: './assist-menu.scss'
})
export class AssistMenu {
  // Only displays when viewport width >= 1280px
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true);
  isOpen = input<boolean>(false);
  updateSelectedAsst = output<Character>();
  assistCharacters = AssistCharacters;

  hoveredAsst = signal<Character>(AssistCharacters[0]);
}
