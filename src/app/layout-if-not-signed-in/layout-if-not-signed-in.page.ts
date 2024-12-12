import {Component, Input, OnInit} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-layout-if-not-signed-in',
  templateUrl: './layout-if-not-signed-in.page.html',
  styleUrls: ['./layout-if-not-signed-in.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    NgIf,
    RouterLink

  ]
})
export class LayoutIfNotSignedInPage {

  @Input() isAuthenticated: boolean = false;

}
