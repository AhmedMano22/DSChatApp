import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstClassRoutingModule } from './first-class-routing.module';
import { FirstClassComponent } from './first-class.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './components/details/details.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentComponent } from './components/payment/payment.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';

@NgModule({
  declarations: [
    FirstClassComponent,
    DetailsComponent,
    PaymentComponent,
    MainComponent,
    SubjectDetailsComponent,
  ],
  imports: [
    CommonModule,
    FirstClassRoutingModule,
    SharedModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FirstClassModule {}
