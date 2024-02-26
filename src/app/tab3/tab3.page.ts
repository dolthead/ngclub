import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink ],
})
export class Tab3Page {
  constructor() {
    addIcons({ addCircleOutline });
  }

  addChat() {
  }
}
