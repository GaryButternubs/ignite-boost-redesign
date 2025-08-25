import { Component, signal } from '@angular/core';
import { VsScreen } from "./vs-screen/vs-screen";
import { ReplayList } from "./replay-list/replay-list";
import { VideoSearch } from '../api/Videos';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-gallery',
  imports: [VsScreen, ReplayList, MatProgressSpinnerModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  // What we need inside Gallery
  // - Query signal that adjusts based on output from vs-screen
  //  - Feed said query into replay-list for searching
  query = signal<VideoSearch>({
    player1: '',
    player2: '',
    char1: '',
    char2: '',
    assist1: '',
    assist2: '',
    version: 2,
    sort: '',
  });

  // Using any is sloppy, and I should find a nicer way of doing it if I can
  updateQueryParam({key, value}: {key: keyof VideoSearch, value: any}) {
    this.query.update((params) => {
      params[key] = value;
      return params;
    });
    console.log(this.query());
  }
}
