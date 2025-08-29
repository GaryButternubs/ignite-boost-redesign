import { Component, computed, input, signal } from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { VideoEmbed } from './video-embed/video-embed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-video-preview',
  imports: [
    VideoEmbed,
    NgClass,
    NgOptimizedImage,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    OverlayModule,
    MatExpansionModule
],
  templateUrl: './video-preview.html',
  styleUrl: './video-preview.scss'
})
export class VideoPreview {
  url = signal<string>('');
  date = signal<string>('');
  version = signal<number>(2);
  versionSelOpen = signal<boolean>(false);

  urlID = computed<string>(() => {
    // Regexes to check for valid YouTube, NicoNico, and BiliBili videos respectively
    const regexes: RegExp[] = [];
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))((\w|-){11})(?:\S+)?$/);
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.|embed\.|live\.)?(?:nicovideo\.jp\/(?:watch\/))(sm(\w|-){8}|lv(\w|-){9})(?:\S+)?$/);
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:bilibili\.com\/(?:video\/))((\w|-){12})(?:\S+)?$/);

    let videoSrc = -1;
    regexes.forEach((regex, index) => {
      if (this.url().match(regex)) videoSrc = index;
    });
    
    return (videoSrc === -1) ? '' : this.url().match(regexes[videoSrc])![1];
  });

  // -1: N/A, 0: YouTube, 1: NicoNico, 2: BiliBili
  videoSrc = computed<number>(() => {
    // Regexes to check for valid YouTube, NicoNico, and BiliBili videos respectively
    const regexes: RegExp[] = [];
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))((\w|-){11})(?:\S+)?$/);
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.|embed\.|live\.)?(?:nicovideo\.jp\/(?:watch\/))(sm(\w|-){8}|lv(\w|-){9})(?:\S+)?$/);
    regexes.push(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:bilibili\.com\/(?:video\/))((\w|-){12})(?:\S+)?$/);

    let videoSrc = -1;
    regexes.forEach((regex, index) => {
      if (this.url().match(regex)) videoSrc = index;
    });
    
    return videoSrc;
  });

  updateVersionSelect(newVersion: number) {
    // Update theme based on selection made
    document.body.classList.remove((newVersion === 2) ? 'dfc-theme' : 'dfci-theme');
    document.body.classList.add((newVersion === 2) ? 'dfci-theme' : 'dfc-theme');

    this.version.set(newVersion);
    this.versionSelOpen.set(false);
  }
}
