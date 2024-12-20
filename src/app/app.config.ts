import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Auth0ClientFactory, Auth0ClientService, AuthModule, AuthService, provideAuth0 } from '@auth0/auth0-angular';
import { UniversalService } from './services/universal.service';
import { franquiciaTService } from './services/franquiciaT.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/material';
import { Theme } from '@fullcalendar/core/internal';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain : 'dev-dsxvlnrmrayuixtb.us.auth0.com',
      clientId: 'YpH2eroSCS8377o3jjv520dSXXFd6ByK',
      cacheLocation: 'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    importProvidersFrom(
      HttpClientModule,
      AuthModule.forRoot({
        domain : 'dev-dsxvlnrmrayuixtb.us.auth0.com',
        clientId: 'YpH2eroSCS8377o3jjv520dSXXFd6ByK',
        cacheLocation: 'localstorage',
        authorizationParams: {
        redirect_uri: window.location.origin
      }
      })
    ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
    
  ]
};


