import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, ModalController, IonAvatar, IonCard, IonCardContent, IonCheckbox, IonLabel, IonCardHeader, IonItem, IonList } from '@ionic/angular/standalone';
import { Auth } from '@angular/fire/auth';
import { UserSettings } from 'src/models/user-settings.model';
import { UserSettingsService } from 'src/services/user-settings.service';
import { AppToastService } from 'src/services/app-toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonCardHeader, IonLabel, CommonModule, FormsModule, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonCard, IonCardContent, IonCheckbox ],
})
export class SettingsPage implements OnInit {
  private readonly auth: Auth = inject(Auth);
  private readonly modalCtrl: ModalController = inject(ModalController);
  private readonly settingsService: UserSettingsService = inject(UserSettingsService);
  private readonly toastCtrl: AppToastService = inject(AppToastService);
  public settings: void | UserSettings = undefined;

  constructor() {
    addIcons({ closeCircleOutline });
  }

  ngOnInit(): void {
    this.settingsService.getUserSettings(this.auth.currentUser)
      .then(data => this.settings = data, () => {});
  }

  saveSettings() {
    this.settingsService.saveUserSettings(this.settings);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.toastCtrl.toast({ message: 'Logged out successfully' });
        this.modalCtrl.dismiss();
      }, error => this.toastCtrl.toast({ message: error.message }));
  }
}
