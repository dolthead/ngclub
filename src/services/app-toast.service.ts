import { Injectable, inject } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppToastService {
    private toastCtrl: ToastController = inject(ToastController);

    toast(options: ToastOptions) {
        this.toastCtrl.create({
            message: 'The thing has been done!',
            duration: 5000,
            ...options
          }).then(toast => toast.present());
    }
}
