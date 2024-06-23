import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'events-tab',
  templateUrl: 'events-tab.page.html',
  styleUrls: ['events-tab.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, RouterLink ]
})
export class EventsTabPage {
  constructor() {
    addIcons({ addCircleOutline });
  }

  addEvent() {
  }
}
