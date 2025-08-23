import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Code } from './code/code';

@Component({
  selector: 'app-background',
  imports: [RouterOutlet, NgClass, Code],
  templateUrl: './background.html',
  styleUrl: './background.scss'
})
export class Background {
  toggleCode = window.matchMedia('(prefers-reduced-motion: no-preference').matches;
}
