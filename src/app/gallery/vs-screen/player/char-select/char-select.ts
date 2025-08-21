import { Component, input, output, signal, computed } from '@angular/core';
import { NgOptimizedImage, NgClass, UpperCasePipe } from '@angular/common';
import { Character, PlayableCharacters } from '../../../../api/Characters';
import { CharMenu } from './char-menu/char-menu';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-char-select',
  imports: [NgOptimizedImage, NgClass, UpperCasePipe, CharMenu, MatIconModule, MatSelectModule, OverlayModule],
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

  charName = computed<string>(() => this.selectedChar().short ?? this.selectedChar().name);

  playableCharacters = PlayableCharacters;

  updateSelectedChar(char: Character) {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }

    this.selectedChar.set(char);
    // Null-ish coalescing multiple times because I smell.
    // This way 'Short' can be different, ie. short='Qwenthur' & internal='Quenser'
    this.updateCharQuery.emit(char.internal ?? char.short ?? char.name);
  }
}
