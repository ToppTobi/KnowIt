import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonTitle, IonToolbar} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton]
})
export class UserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
