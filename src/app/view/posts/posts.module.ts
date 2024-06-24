import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { MainComponent } from './components/main/main.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PostsComponent, MainComponent, PostDetailsComponent],
  imports: [CommonModule, PostsRoutingModule, TranslateModule, SharedModule],
})
export class PostsModule {}
