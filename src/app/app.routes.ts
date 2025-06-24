import { Routes } from '@angular/router';
import { Gallery } from './gallery/gallery';
import { AddVideos } from './add-videos/add-videos';
import { LoginSignup } from './login-signup/login-signup';

export const routes: Routes = [
    {
        path: '',
        component: Gallery,
    },
    {
        path: 'add',
        component: AddVideos,
    },
    {
        path: 'login',
        component: LoginSignup,
    },
    {
        path: 'signup',
        component: LoginSignup,
    }
];
