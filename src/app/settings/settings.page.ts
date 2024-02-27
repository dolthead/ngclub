import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { CollectionReference, Firestore, addDoc, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';

const USER_DATA = 'UserData';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage {
  private auth: Auth = inject(Auth);
  public user: any;
  public currentDoc: any = undefined;
  public settings: any = { 
    displayName: undefined, 
    uid: undefined, 
    seeName: false, 
    allowChat: false, 
    allowInvites: false, 
    allowPhotoTags: false,
  };
  
  private db: Firestore = inject(Firestore);
  public userCollection: CollectionReference = collection(this.db, USER_DATA);

  constructor(private modalCtrl: ModalController, private toast: ToastController) { 
    addIcons({ closeCircleOutline });
    this.user = this.auth.currentUser;

    const q = query(collection(this.db, USER_DATA), where("uid", "==", this.user.uid));
    getDocs(q).then((querySnapshot) => {
      this.currentDoc = querySnapshot.docs.length ? querySnapshot.docs[0] : undefined;
      if (this.currentDoc) {
        this.settings = this.currentDoc.data();
      } else {
        this.settings.displayName = this.user.displayName;
        this.settings.uid = this.user.uid;
        addDoc(this.userCollection, this.settings)
          .then(doc => this.currentDoc = doc, () => {});
      }
    }, () => {})
  }

  saveSettings() {
    setDoc(doc(this.db, USER_DATA, this.currentDoc.id), this.settings);
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
