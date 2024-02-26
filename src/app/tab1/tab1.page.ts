import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, ModalController, ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { SettingsPage } from '../settings/settings.page';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent ],
})
export class Tab1Page {
  private auth: Auth = inject(Auth);
  private provider: GoogleAuthProvider = new GoogleAuthProvider();
  
  constructor(private modalCtrl: ModalController, private toast: ToastController) {
    addIcons({ personOutline });
  }

  refreshPage() {
  }

  async openUserSettings() {
    if (!this.auth.currentUser) {
      signInWithPopup(this.auth, this.provider)
        .then(() => {
          this.openUserSettings();
          this.toast.create({
            message: 'Logged in successfully',
            duration: 5000,
          }).then(toast => toast.present());
        }, (error) => {
          this.toast.create({
            message: error.message,
            duration: 5000,
          }).then(toast => toast.present());
        });
    } else {
      const modal = await this.modalCtrl.create({
        component: SettingsPage,
        initialBreakpoint: 0.5,
        breakpoints: [0, 0.5],
      });
      modal.present();
    }
  }
}
