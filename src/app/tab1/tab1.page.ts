import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent ],
})
export class Tab1Page {
  
  constructor(private modalCtrl: ModalController) {
    addIcons({ personOutline });
  }

  refreshPage() {
  }

  async openUserSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5],
    });
    modal.present();
  }
}
