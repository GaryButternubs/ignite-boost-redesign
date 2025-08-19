import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { Character, PlayableCharacters } from '../../../../../api/Characters';

@Component({
  selector: 'app-char-menu',
  imports: [NgOptimizedImage, NgClass],
  templateUrl: './char-menu.html',
  styleUrl: './char-menu.scss'
})
export class CharMenu {
  // Only displays when viewport width >= 1280px
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects text alignment
  updateSelectedChar = output<Character>();
  playableCharacters = PlayableCharacters;

  hoveredChar = signal<Character>(PlayableCharacters[0]);
}
