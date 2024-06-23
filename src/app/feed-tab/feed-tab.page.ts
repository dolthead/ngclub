import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, ModalController, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'feed-tab',
  templateUrl: 'feed-tab.page.html',
  styleUrls: ['feed-tab.page.scss'],
  standalone: true,
  imports: [IonAvatar,  NgFor, IonLabel, IonItem, IonList, IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonThumbnail ],
})
export class FeedTabPage {
  private modalController: ModalController = inject(ModalController);

  postList = [
    {
      title: 'Post 1',
      content: 'This is the content of post 1',
      imageList: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ],
      likeCount: 10,
      commentCount: 5,

    },
    {
      title: 'Post 2',
      content: 'This is the content of post 2',
      imageList: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ],
      likeCount: 5,
      commentCount: 2,
    },
    {
      title: 'Post 3',
      content: 'This is the content of post 3',
      imageList: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150'
      ],
      likeCount: 3,
      commentCount: 1,
    }
  ];

  constructor() {
    addIcons({ addCircleOutline });
  }

  async addPost() {
    // open modal with a form to add a post
    const modal = await this.modalController.create({
      component: AddPostModalComponent,
      componentProps: {
        // pass any necessary data to the modal component
      }
    });
    await modal.present();
  }
}
