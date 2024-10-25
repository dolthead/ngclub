import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle, IonContent, ModalController } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonIcon, IonButton, IonButtons, IonToolbar, IonHeader],
})
export class AddEventModalComponent implements OnInit {

  private readonly modalController: ModalController = inject(ModalController);

  constructor() { 
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {}

  closeModal() {
    // close the modal
    this.modalController.dismiss();
  }

}
