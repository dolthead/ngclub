import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';

const USER_DATA = 'UserData';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private db: Firestore = inject(Firestore);
    
    getUserList(): Promise<undefined | DocumentData[]> {
        const q = query(collection(this.db, USER_DATA), where("seeName", "==", true));
        return getDocs(q)
            .then((querySnapshot) => querySnapshot.docs.map(doc => doc.data()), () => undefined);
    }
}
