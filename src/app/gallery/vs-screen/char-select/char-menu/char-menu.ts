import { Component, inject, input, output, signal } from '@angular/core';
import { Character, PlayableCharacters } from '../../../../api/Characters';

@Component({
  selector: 'app-char-menu',
  imports: [],
  templateUrl: './char-menu.html',
  styleUrl: './char-menu.scss'
})
export class CharMenu {
  // Only displays when viewport width >= 1280px
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects text alignment
  updateSelectedChar = output<Character>();

  hoveredChar = signal<Character>(PlayableCharacters[0]);
}
