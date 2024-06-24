import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  constructor(private translate: TranslateService) {}
  sections: any[] = [
    {
      title: 'الباب الأول فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب الأول',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب الأول',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب الثاني فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب الثاني',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب الثاني',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب الثالث فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب الثالث',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب الثالث',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب الرابع فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب الرابع',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب الرابع',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب الخامس فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب الخامس',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب الخامس',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب السادس فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب السادس',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب السادس',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
    {
      title: 'الباب السابع فيزياء',
      body: [
        {
          bodyTitle: 'الدرس الأول الباب السابع',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الأولي',
          time: 200,
          qustions: 25,
          type: 'question',
        },
        {
          bodyTitle: 'الدرس الثاني الباب السابع',
          time: 200,
          qustions: 25,
          type: 'lesson',
        },
        {
          bodyTitle: 'اختبار المحاضرة الثانية',
          time: 200,
          qustions: 25,
          type: 'question',
        },
      ],
    },
  ];
  description =
    'جافاسكريبت (JavaScript) هي لغة برمجة تم تطويرها في الأصل من قبل نيتسكيب كوسيلة لإضافة ميزات تفاعلية لصفحات الويب';
}
