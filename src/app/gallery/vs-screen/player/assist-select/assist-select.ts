import { Component, inject, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CheckBreakpoints } from '../../../breakpoints/check-breakpoints';
import { Character, AssistCharacters } from '../../../api/Characters';
import { AssistMenu } from './assist-menu/assist-menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-assist-select',
  imports: [NgOptimizedImage, AssistMenu, MatSelectModule, OverlayModule, MatExpansionModule],
  templateUrl: './assist-select.html',
  styleUrl: './assist-select.scss'
})
export class AssistSelect {
  checkBreakpoints = inject(CheckBreakpoints);

  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // For assist-menu text-alignment
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
