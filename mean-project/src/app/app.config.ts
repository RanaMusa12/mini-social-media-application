import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
   
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuard 
  ]
};
