import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, ModalController, IonItem, IonLabel, IonList, IonAvatar, IonRefresher, IonRefresherContent, IonSkeletonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, personOutline } from 'ionicons/icons';
import { SettingsPage } from '../settings/settings.page';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { DocumentData } from '@angular/fire/firestore';
import { UserDataService } from 'src/services/user-data.service';
import { AppToastService } from 'src/services/app-toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ IonSkeletonText, IonRefresherContent, IonRefresher, IonAvatar, IonList,  IonLabel, IonItem,  NgIf, NgFor, NgStyle, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent ],
})
export class Tab1Page implements OnInit {
  private provider: GoogleAuthProvider = new GoogleAuthProvider();
  private userData: UserDataService = inject(UserDataService);
  private toastService: AppToastService = inject(AppToastService);
  private modalCtrl: ModalController = inject(ModalController);
  
  public auth: Auth = inject(Auth);
  public userList: undefined | DocumentData[] = [];
  public authReady = false;
  public loading = false;
  
  constructor() {
    addIcons({ personOutline, person });
  }

  ngOnInit() {
    this.auth.authStateReady().then(() => {
      this.authReady = true;
      this.refreshPage(undefined);
    }, () => {});
  }

  async refreshPage(event: CustomEvent | undefined) {
    this.userList = [];
    if (this.auth.currentUser) {
      this.loading = true;
      this.userData.getUserList()
        .then((data: undefined | DocumentData[]) => this.userList = data, () => {})
        .finally(() => {
          this.loading = false;
          this.closeRefresher(event);
        });
    } else {
      this.closeRefresher(event);
    }
  }

  closeRefresher(event: CustomEvent | undefined) {
    setTimeout(() => event?.detail?.complete(), 500)
  }

  async openUserSettings() {
    if (!this.auth.currentUser) {
      await signInWithPopup(this.auth, this.provider)
        .then(() => this.toastService.toast({ message: 'Logged in successfully' }),
          error => this.toastService.toast({ message: error.message }));
    }
    if (this.auth.currentUser) {
      const modal = await this.modalCtrl.create({
        component: SettingsPage,
        initialBreakpoint: 0.9,
        breakpoints: [0, 0.6, 0.9],
      });
      modal.present();
      await modal.onDidDismiss();
      this.refreshPage(undefined);
    }
  }
}
