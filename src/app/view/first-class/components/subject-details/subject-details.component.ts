import { Component } from '@angular/core';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.scss'],
})
export class SubjectDetailsComponent {
  classes = [
    {
      id: 1,
      image: 'assets/images/classes/image.jpg',
      Title: 'شرح الكورس كامل',
      description:
        'الكورس يتناول موضوع الفيزياء بشكل شامل، حيث يغطي الأساسيات والمفاهيم المتقدمة مع تطبيقات عملية وتمارين تفاعلية لضمان فهم عميق للمادة',
    },
    {
      id: 2,
      image: 'assets/images/classes/exam.jpg',
      Title: 'حل الامتحانات',
      description:
        'بامتياز في التقديم والتفسير، أقوم بمراجعة حل الامتحانات لضمان فهم الطلاب العميق للموضوعات وتحقيق أقصى درجات النجاح.',
    },
    {
      id: 3,
      image: 'assets/images/classes/final.jpg',
      Title: 'المراجعة النهائية',
      description:
        'باستخدام أسلوب مبسط وشامل، أقوم بإعداد المراجعة النهائية لضمان استعداد الطلاب بشكل كامل للاختبارات النهائية وتحقيق أفضل النتائج.',
    },
  ];
}
