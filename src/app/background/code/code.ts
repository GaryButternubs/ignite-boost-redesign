import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Fragment, Fragments } from './FragmentData';

@Component({
  selector: 'app-code',
  imports: [],
  templateUrl: './code.html',
  styleUrl: './code.scss'
})
export class Code {
  // Input properties
  xPos = input<number>(0);
  yPos = input<number>(0);
  scale = input<number>(0);
  fragment = input<number>(0); // Can be one of three code fragments (0 - 2)
  travelX = input<boolean>(true); // True: move horizontal. False: move vertical

  // Always moves towards center, either in positive or negative direction
  moveDir = (this.travelX()) ? (window.innerWidth / 2 > this.xPos()) : (window.innerHeight / 2 > this.yPos());
}
