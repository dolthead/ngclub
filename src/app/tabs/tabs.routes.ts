import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homeTab',
        loadComponent: () =>
          import('../home-tab/home-tab.page').then((m) => m.HomeTabPage),
      },
      {
        path: 'feedTab',
        loadComponent: () =>
          import('../feed-tab/feed-tab.page').then((m) => m.FeedTabPage),
      },
      {
        path: 'messagesTab',
        loadComponent: () =>
          import('../messages-tab/messages-tab.page').then((m) => m.MessagesTabPage),
      },
      {
        path: 'eventsTab',
        loadComponent: () =>
          import('../events-tab/events-tab.page').then((m) => m.EventsTabPage),
      },
      {
        path: '',
        redirectTo: '/tabs/homeTab',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/homeTab',
    pathMatch: 'full',
  },
];
