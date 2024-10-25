import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonButtons, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { AddEventModalComponent } from '../add-event-modal/add-event-modal.component';

@Component({
  selector: 'events-tab',
  templateUrl: 'events-tab.page.html',
  styleUrls: ['events-tab.page.scss'],
  standalone: true,
  imports: [IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, RouterLink ]
})
export class EventsTabPage {
  private readonly modalController: ModalController = inject(ModalController);
  constructor() {
    addIcons({ addCircleOutline });
  }

  async addEvent() {
    const modal = await this.modalController.create({
      component: AddEventModalComponent,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.6, 0.9],
      componentProps: {
        // pass any necessary data to the modal component
      }
    });
    await modal.present();
  }
}
