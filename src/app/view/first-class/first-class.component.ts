import { Component } from '@angular/core';

@Component({
  selector: 'app-first-class',
  templateUrl: './first-class.component.html',
  styleUrls: ['./first-class.component.scss'],
})
export class FirstClassComponent {
  classes = [
    {
      id: 1,
      image: 'assets/images/classes/class.jpg',
      classTitle: 'شرح الكورس كامل',
      description:
        'الكورس يتناول موضوع الفيزياء بشكل شامل، حيث يغطي الأساسيات والمفاهيم المتقدمة مع تطبيقات عملية وتمارين تفاعلية لضمان فهم عميق للمادة',
    },
    {
      id: 2,
      image: 'assets/images/classes/exam.jpg',
      classTitle: 'حل الامتحانات',
      description:
        'بامتياز في التقديم والتفسير، أقوم بمراجعة حل الامتحانات لضمان فهم الطلاب العميق للموضوعات وتحقيق أقصى درجات النجاح.',
    },
    {
      id: 3,
      image: 'assets/images/classes/final.jpg',
      classTitle: 'المراجعة النهائية',
      description:
        'باستخدام أسلوب مبسط وشامل، أقوم بإعداد المراجعة النهائية لضمان استعداد الطلاب بشكل كامل للاختبارات النهائية وتحقيق أفضل النتائج.',
    },
  ];
}
