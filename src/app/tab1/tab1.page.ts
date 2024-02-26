import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab1Page {
  constructor() {
    addIcons({ personOutline });
  }

  refreshPage() {
  }

  openUserSettings() {
  }
}
