import { Injectable, inject } from '@angular/core';
import { User } from '@angular/fire/auth';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { UserSettings } from 'src/models/user-settings.model';

const USER_DATA = 'UserData';

const NewUserSettings: UserSettings = {
    displayName: '',
    email: '',
    photoUrl: '',
    uid: '',
    seeName: false,
    allowChat: false,
    allowInvites: false,
    allowPhotoTags: false,
};

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {
    private readonly db: Firestore = inject(Firestore);
    private readonly userCollection: CollectionReference = collection(this.db, USER_DATA);

    currentUserDoc: DocumentReference | undefined;

    getUserSettings(currentUser: User | null): Promise<void | UserSettings> {
        const q = query(collection(this.db, USER_DATA), where("uid", "==", currentUser?.uid));
        return getDocs(q)
            .then((querySnapshot) => {
                this.currentUserDoc = querySnapshot.docs.length ? querySnapshot.docs[0].ref : undefined;
                if (this.currentUserDoc) {
                    const userData = querySnapshot.docs[0].data();
                    return {
                        uid: userData['uid'],
                        displayName: userData['displayName'],
                        email: userData['email'],
                        photoUrl: userData['photoUrl'],
                        seeName: userData['seeName'],
                        allowChat: userData['allowChat'],
                        allowInvites: userData['allowInvites'],
                        allowPhotoTags: userData['allowPhotoTags'],
                    } as UserSettings;
                } else {
                    const newSettings: UserSettings = {
                        ...NewUserSettings,
                        displayName: currentUser!.displayName,
                        photoUrl: currentUser!.photoUrl,
                        uid: currentUser!.uid,
                        email: currentUser!.email,
                    };
                    addDoc(this.userCollection, newSettings)
                        .then(data => this.currentUserDoc = data, () => {});
                    return newSettings;
                }
            }, () => { });
    };

    saveUserSettings(settings: void | UserSettings): Promise<Error | void> {
        if (settings && this.currentUserDoc) {
            return setDoc(doc(this.db, USER_DATA, this.currentUserDoc['id']), settings);
        } else {
            return Promise.reject(new Error('No settings to save'));
        }
    }
}
