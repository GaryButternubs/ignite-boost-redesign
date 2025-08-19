import { Component, inject, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Character, PlayableCharacters } from '../../../../api/Characters';
import { CharMenu } from './char-menu/char-menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-char-select',
  imports: [NgOptimizedImage, CharMenu, MatSelectModule, OverlayModule],
  templateUrl: './char-select.html',
  styleUrl: './char-select.scss'
})
export class CharSelect {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // For char-menu text-alignment
  isFull = input<boolean>(true);
  updateCharQuery = output<string>();

  selectedChar = signal<Character>(PlayableCharacters[10]); // All characters
  isOpen = signal<boolean>(false);

  playableCharacters = PlayableCharacters;

  updateSelectedChar(char: Character) {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }

    this.selectedChar.set(char);
    // Null-ish coalescing multiple times because I smell
    this.updateCharQuery.emit(char.internal ?? char.short ?? char.name);
  }

  debuggingFunction() {
    console.log('Opening overlay');
    this.isOpen.set(!this.isOpen());
  }
}
