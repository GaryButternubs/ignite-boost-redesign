import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarOption } from '../navbar-option';
import { DfcButton } from '../../components/dfc-button/dfc-button';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navlist',
  imports: [
    NgClass, 
    RouterLink,
    DfcButton, 
    MatListModule,
    MatButtonModule, 
    MatMenuModule, 
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './navlist.html',
  styleUrl: './navlist.scss'
})
export class Navlist {
  // TO-DO: Inject a service that manages login state
  isMobile = input<boolean>(false);

  // Navbar options
  options: NavbarOption[] = [
    {
      text: 'Search Replays',
      id: 1,
      url: { path: '/' },
    },
    {
      text: 'Resources',
      id: 2,
      children: [
        {
          text: 'DFC Resource Site',
          id: 1,
          url: { path: 'https://sites.google.com/view/dfci-guide/', external: true},
        },
        {
          text: 'DFCI Mizuumi Wiki',
          id: 2,
          url: { path: 'https://wiki.gbl.gg/w/Dengeki_Bunko:_Fighting_Climax/DFCI', external: true },
        },
        {
          text: 'Report an issue',
          id: 3,
          url: { path: 'mailto:ignite-boost.net@gmail.com', external: true},
        }
      ],
      elementType: 'dropdown',
    },
    {
      text: 'Add a Replay',
      id: 3,
      url: { path: '/add' },
    },
    {
      text: 'Login',
      id: 4,
      url: { path: '/login' },
    },
    {
      text: 'Signup',
      id: 5,
      url: { path: '/signup' },
      elementType: 'dfc-button',
    }
  ];
}
