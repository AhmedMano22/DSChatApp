import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteCourseComponent } from './components/complete-course/complete-course.component';
import { ClassCoursesComponent } from './components/class-courses/class-courses.component';
import { FreeLecturesComponent } from './components/free-lectures/free-lectures.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    HomeComponent,
    HeroSectionComponent,
    CompleteCourseComponent,
    ClassCoursesComponent,
    FreeLecturesComponent,
    FooterComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    HomeRoutingModule,
    // BrowserAnimationsModule,
    // RouterModule,
    SharedModule,
    TranslateModule,
    CarouselModule,
  ],
})
export class HomeModule {}
