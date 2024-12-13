import { SplashScreen } from '@capacitor/splash-screen';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonTitle, IonToolbar, IonHeader, IonRouterLinkWithHref
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet, IonTitle, IonToolbar, IonHeader, IonRouterLinkWithHref],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    // Hide the splash (you should do this on app launch)
    await SplashScreen.hide();

    // Show the splash for an indefinite amount of time
    await SplashScreen.show({
      autoHide: false,
    });

    // Show the splash for two seconds and then automatically hide it
    setTimeout(async () => {
      await SplashScreen.show({
        showDuration: 2000,
        autoHide: true,
      });
    }, 2000);
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.style.filter = this.isDarkMode ? 'invert(1)' : 'invert(0)';
  }
}
