import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-background',
  imports: [RouterOutlet],
  templateUrl: './background.html',
  styleUrl: './background.scss'
})
export class Background {
  children = input<HTMLElement>();
}
