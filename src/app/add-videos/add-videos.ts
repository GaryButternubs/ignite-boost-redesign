import { Component } from '@angular/core';

@Component({
  selector: 'app-add-videos',
  imports: [],
  templateUrl: './add-videos.html',
  styleUrl: './add-videos.scss'
})
export class AddVideos {
  
  // Need to do this since this is a single-page application via <router-outlet />
  resetTheme() {
    document.body.classList.remove('dfc-theme');
    document.body.classList.add('dfci-theme');
  }
}
