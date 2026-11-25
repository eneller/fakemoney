import { ApplicationConfig, DEFAULT_CURRENCY_CODE, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth-interceptor';
import { APIService } from './services/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {provide: DEFAULT_CURRENCY_CODE, useValue: ''},
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'shortDate'}},
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAppInitializer(() => inject(APIService).checkAuthStatus()),
  ]
};
