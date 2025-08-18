import { Component, inject, input } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { CheckBreakpoints } from '../../breakpoints/check-breakpoints';
import { AssistSelect } from "./assist-select/assist-select";
import { CharSelect } from "./char-select/char-select";

@Component({
  selector: 'app-vs-screen',
  imports: [NgOptimizedImage, AssistSelect, CharSelect],
  templateUrl: './vs-screen.html',
  styleUrl: './vs-screen.scss'
})
export class VsScreen {
  checkBreakpoints = inject(CheckBreakpoints);

  // TO-DO: Find some way to make changes to the query object of 'gallery'
}
