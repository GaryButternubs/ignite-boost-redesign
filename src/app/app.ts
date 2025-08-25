import { Component, signal } from '@angular/core';
import { Navbar } from "./navbar/navbar";
import { Background } from "./background/background";

@Component({
  selector: 'app-root',
  imports: [Navbar, Background],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'ignite-boost-redesign';
  isIgnition = signal<boolean>(true);
}
