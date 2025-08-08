import { Component, inject, input, output, signal } from '@angular/core';
import { CheckBreakpoints } from '../../../breakpoints/check-breakpoints';
import { Character, PlayableCharacters } from '../../../api/Characters';
import { CharMenu } from './char-menu/char-menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-char-select',
  imports: [CharMenu, MatSelectModule, OverlayModule],
  templateUrl: './char-select.html',
  styleUrl: './char-select.scss'
})
export class CharSelect {
  checkBreakpoints = inject(CheckBreakpoints);

  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects skew direction 
  updateCharQuery = output<string>();

  selectedChar = signal<Character>(PlayableCharacters[10]); // All characters
  isOpen = signal<boolean>(false);

  playableCharacters = PlayableCharacters;

  updateSelectedChar(char: Character) {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }

    this.selectedChar.set(char);
    // Null-ish coalescing multiple times because I suck
    this.updateCharQuery.emit(char.internal ?? char.short ?? char.name);
  }
}
