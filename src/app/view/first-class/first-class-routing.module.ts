import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstClassComponent } from './first-class.component';
import { DetailsComponent } from './components/details/details.component';
import { MainComponent } from './components/main/main.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';

const routes: Routes = [
  {
    path: '',
    component: FirstClassComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'subject/:id', component: SubjectDetailsComponent },
      { path: 'payment', component: PaymentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstClassRoutingModule {}
