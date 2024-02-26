import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { 
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
  }

  close() { 
    this.modalCtrl.dismiss();
  }

}
