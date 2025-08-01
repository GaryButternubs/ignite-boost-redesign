import { Component, input, output, signal } from '@angular/core';
import { Character, PlayableCharacters } from '../../../api/Characters';

@Component({
  selector: 'app-player-search',
  imports: [],
  templateUrl: './player-search.html',
  styleUrl: './player-search.scss'
})
export class PlayerSearch {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // Affects skew direction 
  updatePlayerQuery = output<string>();

  selectedChar = signal<Character>(PlayableCharacters[10]); // All characters

  updateDisplayedPlayer(char: Character) {
    this.selectedChar.set(char);

    // Null-ish coalescing multiple times because I suck
    this.updatePlayerQuery.emit(char.internal ?? char.short ?? char.name);
  }
}
