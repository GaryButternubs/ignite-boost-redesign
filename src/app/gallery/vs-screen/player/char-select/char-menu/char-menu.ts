import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { Character, PlayableCharacters } from '../../../../../api/video-service/Characters';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-char-menu',
  imports: [NgOptimizedImage, NgClass, MatProgressSpinnerModule],
  templateUrl: './char-menu.html',
  styleUrl: './char-menu.scss'
})
export class CharMenu {
  // Only displays when viewport width >= 1280px
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects text alignment
  updateSelectedChar = output<Character>();
  elementHeight = output<number>();
  
  playableCharacters = PlayableCharacters;

  hoveredChar = signal<Character>(PlayableCharacters[0]);
}
