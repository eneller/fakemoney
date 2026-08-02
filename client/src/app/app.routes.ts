import { Routes } from '@angular/router';
import { ScreenSend } from './screens/screen-send/screen-send';
import { ScreenRequest } from './screens/screen-request/screen-request';
import { ScreenProfile } from './screens/screen-profile/screen-profile';
import { ScreenLogin } from './screens/screen-login/screen-login';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: '/send',
    },
    {
        path: 'login',
        component: ScreenLogin,
    },
    {
        path:'send',
        component: ScreenSend,
        canActivate: [authGuard],
    },
    {
        path:'receive',
        component: ScreenRequest,
        canActivate: [authGuard],
    },
    {
        path:'profile',
        component: ScreenProfile,
        canActivate: [authGuard],
    },
];
