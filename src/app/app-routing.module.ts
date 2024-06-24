import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./view/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'First',
    loadChildren: () =>
      import('./view/first-class/first-class.module').then(
        (m) => m.FirstClassModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./view/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'Posts',
    loadChildren: () =>
      import('./view/posts/posts.module').then((m) => m.PostsModule),
  },
  {
    path: 'Chats',
    loadChildren: () =>
      import('./view/chats/chats.module').then((m) => m.ChatsModule),
  },
  {
    path: 'meetings',
    loadChildren: () =>
      import('./view/meetings/meetings.module').then((m) => m.MeetingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
