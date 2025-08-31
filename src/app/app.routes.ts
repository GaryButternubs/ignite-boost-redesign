import { Routes } from '@angular/router';
import { Gallery } from './gallery/gallery';
import { authGuard } from './guards/auth-guard';
import { authOutGuard } from './guards/auth-out-guard';
import { secureGuard } from './guards/secure-guard';

export const routes: Routes = [
    {
        path: '',
        component: Gallery,
    },
    
    // Lazy-loaded components.
    // https://next.angular.dev/guide/routing/define-routes#loading-route-component-strategies
    // https://angular.dev/reference/migrations/route-lazy-loading
    {
        path: 'add',
        loadComponent: () => import('./add-videos/add-videos').then(m => m.AddVideos),
        title: 'Add Videos',
        canMatch: [authGuard, secureGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./login-signup/login-signup').then(m => m.LoginSignup),
        title: 'Login',
        canMatch: [authOutGuard, secureGuard],
    },
    {
        path: 'signup',
        loadComponent: () => import('./login-signup/login-signup').then(m => m.LoginSignup),
        title: 'Signup',
        canMatch: [authOutGuard, secureGuard]
    },
    {
        path: 'change',
        loadComponent: () => import('./login-signup/login-signup').then(m => m.LoginSignup),
        title: 'Change Password',
        canMatch: [authGuard, secureGuard]
    },
    {
        path: '**', 
        component: Gallery
    }
];
