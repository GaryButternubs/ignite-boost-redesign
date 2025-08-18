import { Component } from '@angular/core';
import { VsScreen } from "./vs-screen/vs-screen";
import { ReplayList } from "./replay-list/replay-list";

@Component({
  selector: 'app-gallery',
  imports: [VsScreen, ReplayList],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  // What we need inside Gallery
  // - Query signal that adjusts based on output from vs-screen
  //  - Feed said query into replay-list for searching
}
