import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { Character, AssistCharacters } from '../../../../api/Characters';
import { AssistMenu } from './assist-menu/assist-menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-assist-select',
  imports: [NgOptimizedImage, NgClass, AssistMenu, MatSelectModule, OverlayModule, MatExpansionModule],
  templateUrl: './assist-select.html',
  styleUrl: './assist-select.scss'
})
export class AssistSelect {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // For assist-menu text-alignment
  isFull = input<boolean>(true);
  updateAsstQuery = output<string>();

  selectedAsst = signal<Character>(AssistCharacters[0]); // All assists
  isOpen = signal<boolean>(false);

  assistCharacters = AssistCharacters;

  updateSelectedAssist(char: Character) {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }

    this.selectedAsst.set(char);
    // Null-ish coalescing multiple times because I smell
    this.updateAsstQuery.emit(char.internal ?? char.short ?? char.name);
  }
}
