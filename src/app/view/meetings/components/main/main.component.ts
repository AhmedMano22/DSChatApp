import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  meetings = [
    {
      id: 1,
      class: 'الأول',
      Title: 'شرح الكورس كامل',
      zoom: 'https://gitlab.com',
      timing: 'يوم الأحد من الساعة 10 صباحا الي الساعة 11 صباحا',
      description:
        'الكورس يتناول موضوع الفيزياء بشكل شامل، حيث يغطي الأساسيات والمفاهيم المتقدمة مع تطبيقات عملية وتمارين تفاعلية لضمان فهم عميق للمادة',
    },
    {
      id: 2,
      class: 'الثاني',
      Title: 'حل الامتحانات',
      zoom: 'https://gitlab.com',
      timing: 'يوم الأثنين من الساعة 10 مساءا الي الساعة 11 مساءا',
      description:
        'بامتياز في التقديم والتفسير، أقوم بمراجعة حل الامتحانات لضمان فهم الطلاب العميق للموضوعات وتحقيق أقصى درجات النجاح.',
    },
    {
      id: 3,
      class: 'الثالث',
      zoom: 'https://gitlab.com',
      Title: 'المراجعة النهائية',
      timing: 'يوم الأحد من الساعة 9 صباحا الي الساعة 11 صباحا',
      description:
        'باستخدام أسلوب مبسط وشامل، أقوم بإعداد المراجعة النهائية لضمان استعداد الطلاب بشكل كامل للاختبارات النهائية وتحقيق أفضل النتائج.',
    },
  ];
}
