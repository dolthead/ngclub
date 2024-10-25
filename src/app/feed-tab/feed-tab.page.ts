import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonThumbnail, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButtons, IonButton, ModalController, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { AddPostModalComponent } from '../add-post-modal/add-post-modal.component';
import { Post } from 'src/models/post.model';

@Component({
  selector: 'feed-tab',
  templateUrl: 'feed-tab.page.html',
  styleUrls: ['feed-tab.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonLabel, IonItem, IonList, IonButton, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonThumbnail ],
})
export class FeedTabPage {
  private readonly modalController: ModalController = inject(ModalController);

  postList: Post[] = [
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the content of post 1',
      // add string[] type to imageList
      imageList: [],
      likeCount: 10,
      commentCount: 5,

    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the content of post 2',
      imageList: [
      ],
      likeCount: 5,
      commentCount: 2,
    },
    {
      id: 3,
      title: 'Post 3',
      content: 'This is the content of post 3',
      imageList: [
      ],
      likeCount: 3,
      commentCount: 1,
    }
  ];

  constructor() {
    addIcons({ addCircleOutline });
    this.postList.forEach(post => {
      // [1, 2, 3].forEach(() => post.imageList.push(`https://via.placeholder.com/150?text=${post.id}`));
      [1, 2].forEach(() => post.imageList.push(`https://via.placeholder.com/150?text=${post.id}`));
    });
  }

  async addPost() {
    // open modal with a form to add a post
    const modal = await this.modalController.create({
      component: AddPostModalComponent,
      initialBreakpoint: 0.9,
      breakpoints: [0, 0.6, 0.9],
      componentProps: {
        // pass any necessary data to the modal component
      }
    });
    await modal.present();
  }
}
