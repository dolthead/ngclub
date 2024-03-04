import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, ModalController, ToastController, LoadingController, IonItem, IonLabel, IonList, IonAvatar, IonRefresher, IonRefresherContent, IonSkeletonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { person, personOutline } from 'ionicons/icons';
import { SettingsPage } from '../settings/settings.page';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { collection, where, getDocs, Firestore, query, DocumentData } from '@angular/fire/firestore';

const USER_DATA = 'UserData';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [ IonSkeletonText, IonRefresherContent, IonRefresher, IonAvatar, IonList,  IonLabel, IonItem,  NgIf, NgFor, NgStyle, IonButtons, IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent ],
})
export class Tab1Page implements OnInit {
  public auth: Auth = inject(Auth);
  private provider: GoogleAuthProvider = new GoogleAuthProvider();
  private db: Firestore = inject(Firestore);
  public userList: DocumentData[] = [];
  public authReady = false;
  public loading = false;
  
  constructor(private modalCtrl: ModalController, private toast: ToastController) {
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
      const q = query(collection(this.db, USER_DATA), where("seeName", "==", true));
      getDocs(q).then((querySnapshot) => {
        setTimeout(() => event?.detail?.complete(), 500);
        this.userList = querySnapshot.docs.map(doc => doc.data());
        this.loading = false;
      }, () => {});
    }
  }

  async openUserSettings() {
    if (!this.auth.currentUser) {
      signInWithPopup(this.auth, this.provider)
        .then(data => {
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
        initialBreakpoint: 1.0,
        breakpoints: [0, 0.6, 1.0],
      });
      modal.present();
      await modal.onDidDismiss();
      this.refreshPage(undefined);
    }
  }
}
