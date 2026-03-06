import { Routes } from '@angular/router';
import { ScreenSend } from './screens/screen-send/screen-send';
import { ScreenReceive } from './screens/screen-receive/screen-receive';
import { ScreenProfile } from './screens/screen-profile/screen-profile';
import { ScreenLogin } from './screens/screen-login/screen-login';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: '/send'
    },
    {
        path: 'login',
        component: ScreenLogin,
    },
    {
        path:'send',
        component: ScreenSend,
    },
    {
        path:'receive',
        component: ScreenReceive,
    },
    {
        path:'profile',
        component: ScreenProfile,
    },
];
