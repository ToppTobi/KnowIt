import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

/* Ionicons-Import */
import { addIcons } from 'ionicons';
import { personOutline, homeOutline, addCircleOutline } from 'ionicons/icons';

/* Icons registrieren */
addIcons({
  'person-outline': personOutline,
  'home-outline': homeOutline,
  'add-circle-outline': addCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
