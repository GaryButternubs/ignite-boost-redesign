import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CharSelect } from './char-select/char-select';
import { AssistSelect } from "./assist-select/assist-select";

@Component({
  selector: 'app-player',
  imports: [CharSelect, NgClass, AssistSelect],
  templateUrl: './player.html',
  styleUrl: './player.scss'
})
export class Player {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true);
  isHandset = input<boolean>(true);
  isFull = input<boolean>(true);
}
