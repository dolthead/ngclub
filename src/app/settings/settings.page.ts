import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
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

  constructor(private modalCtrl: ModalController, private toast: ToastController) { 
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
  }

  close() { 
    this.modalCtrl.dismiss();
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.toast.create({
          message: 'Logged out successfully',
          duration: 5000,
        }).then(toast => toast.present());
      }, (error) => {
        this.toast.create({
          message: error.message,
          duration: 5000,
        }).then(toast => toast.present());
      });
    this.modalCtrl.dismiss();
  }

}
