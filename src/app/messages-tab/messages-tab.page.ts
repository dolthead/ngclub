import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'messages-tab',
  templateUrl: 'messages-tab.page.html',
  styleUrls: ['messages-tab.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink ],
})
export class MessagesTabPage {
  constructor() {
    addIcons({ addCircleOutline });
  }

  addChat() {
  }
}
