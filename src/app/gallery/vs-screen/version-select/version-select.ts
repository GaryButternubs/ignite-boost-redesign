import { Component, output, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { VideoSearch } from '../../../api/Videos';
@Component({
  selector: 'app-version-select',
  imports: [MatButtonToggleModule, NgClass],
  templateUrl: './version-select.html',
  styleUrl: './version-select.scss'
})
export class VersionSelect {
  isIgnition = signal<boolean>(true);
  updateVersionQuery = output<{ key: keyof VideoSearch; value: string | number; }>();

  updateSelectedVersion(version: number) {
    // TO-DO: Find a way to change theme based on version selected

    this.isIgnition.set(version === 2);
    this.updateVersionQuery.emit({ key: 'version', value: version });
  }
}
