import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { HttpClient } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { SharedCardComponent } from './components/shared-card/shared-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MaterialModule } from '../material/material.module';
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    NavbarComponent,
    SharedCardComponent,
    FooterComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule,
    MaterialModule,
    // TranslateModule.forRoot({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
  ],
  exports: [NavbarComponent, SharedCardComponent, UserProfileComponent],
})
export class SharedModule {
  // constructor(private translateService: TranslateService) {
  //   const appLang = localStorage.getItem('app-lang') ?? 'ar';
  //   this.translateService.setDefaultLang('ar');
  //   this.translateService.use(appLang);
  //   this.translateService.onLangChange.subscribe((event) => {
  //     document.documentElement.dir = event.lang === 'ar' ? 'rtl' : 'ltr';
  //     document.documentElement.lang = event.lang;
  //     localStorage.setItem('app-lang', event.lang);
  //   });
  // }
}
