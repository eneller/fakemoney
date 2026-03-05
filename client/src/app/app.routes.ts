import { Routes } from '@angular/router';
import { ScreenSend } from './screens/screen-send/screen-send';
import { ScreenReceive } from './screens/screen-receive/screen-receive';
import { ScreenProfile } from './screens/screen-profile/screen-profile';

export const routes: Routes = [
    {
        path: '',
        pathMatch:'full',
        redirectTo: '/send'
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
