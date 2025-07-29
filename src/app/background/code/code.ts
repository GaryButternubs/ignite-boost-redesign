import { Component } from '@angular/core';
import { CodeFragment } from './code-fragment/code-fragment';
import { Fragments, FragmentComponent } from './code-fragment/FragmentData';

@Component({
  selector: 'app-code',
  imports: [CodeFragment],
  templateUrl: './code.html',
  styleUrl: './code.scss'
})
export class Code {
  private maxFragments = 5;
  private spawnDelay = 750; // milliseconds
  private currentIndex = 0;
  fragments: FragmentComponent[] = [];

  createFragments = setInterval(() => {
    let fragment : FragmentComponent = {
      xPos: 0,
      yPos: 0,
      scale: 0,
      fragmentId: -1,
      fragmentIndex: -1,
      travelX: false
    };

    this.initializeFragment(fragment); 
    fragment.fragmentIndex = this.currentIndex;
    this.currentIndex++;

    if (this.fragments.length == this.maxFragments) {
      clearInterval(this.createFragments);
    }
  }, this.spawnDelay);

  // Once a fragment has finished animating, move it and restart
  respawnFragment(fragmentId: number) {
    const fragment = this.fragments[fragmentId];
    this.initializeFragment(fragment);
  }

  initializeFragment(fragment: FragmentComponent) {
    fragment.xPos = Math.random() * window.innerWidth;
    fragment.yPos = Math.random() * window.innerHeight;
    fragment.scale = Math.random() + 0.25;
    fragment.fragmentId = Math.floor(Math.random() * Fragments.length + 1);
    fragment.travelX = Boolean(Math.floor(Math.random() + 1));
  }
}
