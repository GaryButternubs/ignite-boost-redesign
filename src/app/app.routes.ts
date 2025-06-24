import { Routes } from '@angular/router';
import { Gallery } from './gallery/gallery';

export const routes: Routes = [
    {
        path: '',
        component: Gallery,
    },
    
    // Lazy-loaded components. Shouldn't need ".then()", but gives an error otherwise?
    // https://next.angular.dev/guide/routing/define-routes#loading-route-component-strategies
    // https://angular.dev/reference/migrations/route-lazy-loading
    {
        path: 'add',
        loadComponent: () => import('./add-videos/add-videos').then(m => m.AddVideos),
    },
    {
        path: 'login',
        loadComponent: () => import('./login-signup/login-signup').then(m => m.LoginSignup),
    },
    {
        path: 'signup',
        loadComponent: () => import('./login-signup/login-signup').then(m => m.LoginSignup),
    }
];
