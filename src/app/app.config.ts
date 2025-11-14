import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor';
import { provideNativeDateAdapter } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([JwtInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({
        // Restauración y anclas habilitadas
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })
    )
  ]
};
