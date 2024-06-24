import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
  apiData = [
    {
      url: 'assets/images/home/new1.jpg',
      name: 'Carl Oliver',
      id: '3',
    },
    {
      url: 'assets/images/home/new2.jpg',
      name: 'Carl Oliver',
      id: '3',
    },
    {
      url: 'assets/images/home/new3.jpg',
      name: 'Carl Oliver',
      id: '3',
    },
  ];
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: true,
    autoHeight: true,
    autoWidth: true,
    rtl: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  constructor(private translate: TranslateService) {}
}
