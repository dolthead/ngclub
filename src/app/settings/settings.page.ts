import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonicModule, ModalController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  private auth: Auth = inject(Auth);

  constructor(private modalCtrl: ModalController) { 
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
  }

  close() { 
    this.modalCtrl.dismiss();
  }

  logout() {
    this.auth.signOut();
    this.modalCtrl.dismiss();
  }

}
