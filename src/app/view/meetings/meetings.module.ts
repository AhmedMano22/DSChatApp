import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { MainComponent } from './components/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MeetingsComponent, MainComponent],
  imports: [CommonModule, MeetingsRoutingModule, TranslateModule, SharedModule],
})
export class MeetingsModule {}
