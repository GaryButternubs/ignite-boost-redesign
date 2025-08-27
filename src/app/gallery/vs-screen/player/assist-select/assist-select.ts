import { Component, input, output, signal } from '@angular/core';
import { NgOptimizedImage, NgClass } from '@angular/common';
import { Character, AssistCharacters } from '../../../../api/video-service/Characters';
import { AssistMenu } from './assist-menu/assist-menu';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-assist-select',
  imports: [
    NgOptimizedImage, 
    NgClass, 
    AssistMenu, 
    MatSelectModule, 
    OverlayModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './assist-select.html',
  styleUrl: './assist-select.scss'
})
export class AssistSelect {
  isIgnition = input<boolean>(true);
  isP1 = input<boolean>(true); // For assist-menu text-alignment
  isFull = input<boolean>(true);
  updateAsstQuery = output<string>();
  updateAsstDisplay = output<Character>();

  selectedAsst = signal<Character>(AssistCharacters[0]); // All assists
  isOpen = signal<boolean>(false);

  assistCharacters = AssistCharacters;
  sortedAssists = [...this.assistCharacters].sort((a: Character, b: Character) => a.name.localeCompare(b.name));

  updateSelectedAssist(asst: Character) {
    if (this.isOpen()) {
      this.isOpen.set(false);
    }

    this.selectedAsst.set(asst);
    // Null-ish coalescing multiple times because I smell.
    // This way 'Short' can be different, ie. short='Qwenthur' & internal='Quenser'
    this.updateAsstQuery.emit(asst.internal ?? asst.short ?? asst.name);

    // Handle displaying on player select options
    this.updateAsstDisplay.emit(asst);
  }
}
