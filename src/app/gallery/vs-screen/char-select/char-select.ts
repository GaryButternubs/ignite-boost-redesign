import { Component, input, output, signal } from '@angular/core';
import { Character, PlayableCharacters } from '../../../api/Characters';

@Component({
  selector: 'app-char-select',
  imports: [],
  templateUrl: './char-select.html',
  styleUrl: './char-select.scss'
})
export class CharSelect {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects skew direction 
  updateCharQuery = output<string>();

  selectedChar = signal<Character>(PlayableCharacters[10]); // All characters

  updateDisplayedChar(char: Character) {
    this.selectedChar.set(char);

    // Null-ish coalescing multiple times because I suck
    this.updateCharQuery.emit(char.internal ?? char.short ?? char.name);
  }
}
