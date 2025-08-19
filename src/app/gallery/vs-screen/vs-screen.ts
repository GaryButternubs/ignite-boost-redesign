import { Component, computed, inject, input } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { CheckBreakpoints } from '../../breakpoints/check-breakpoints';
import { Player } from "./player/player";
import { VideoSearch } from '../../api/Videos';

@Component({
  selector: 'app-vs-screen',
  imports: [NgOptimizedImage, NgClass, Player,],
  templateUrl: './vs-screen.html',
  styleUrl: './vs-screen.scss'
})
export class VsScreen {
  checkBreakpoints = inject(CheckBreakpoints);
  query = input<VideoSearch>();
  isIgnition = computed<boolean>(() => !(this.query()?.version === 2)); // 2 is DFCI, 1 is DFC
  isHandset = computed<boolean>(() => this.checkBreakpoints.getIsHandset());
  isFull = computed<boolean>(() => this.checkBreakpoints.getIsFull());

  // TO-DO: Find some way to make changes to the query object of 'gallery'
}
