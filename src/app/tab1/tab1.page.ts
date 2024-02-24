import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  constructor() {}
}
