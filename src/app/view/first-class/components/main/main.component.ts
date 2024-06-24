import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  Subjects = [
    {
      id: 1,
      image: 'assets/images/classes/jabr.png',
      Title: 'الجبر والهندسة الفراغية',
      description:
        'الكورس يتناول موضوع الفيزياء بشكل شامل، حيث يغطي الأساسيات والمفاهيم المتقدمة مع تطبيقات عملية وتمارين تفاعلية لضمان فهم عميق للمادة',
    },
    {
      id: 2,
      image: 'assets/images/classes/tafadl.png',
      Title: 'التفاضل والتكامل',
      description:
        'بامتياز في التقديم والتفسير، أقوم بمراجعة حل الامتحانات لضمان فهم الطلاب العميق للموضوعات وتحقيق أقصى درجات النجاح.',
    },
    {
      id: 3,
      image: 'assets/images/classes/dynamica.png',
      Title: 'الديناميكا',
      description:
        'باستخدام أسلوب مبسط وشامل، أقوم بإعداد المراجعة النهائية لضمان استعداد الطلاب بشكل كامل للاختبارات النهائية وتحقيق أفضل النتائج.',
    },
  ];
}
