import { Component, input, output, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-player-search',
  imports: [MatInputModule],
  templateUrl: './player-search.html',
  styleUrl: './player-search.scss'
})
export class PlayerSearch {
  isP1 = input<boolean>(true); // Affects skew direction
  updatePlayerQuery = output<string>();

  playerInput = signal<string>('');

  updatePlayerInput(player: string) {
    this.playerInput.set(player);
    this.updatePlayerQuery.emit(player);
  }
}
