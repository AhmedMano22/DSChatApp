import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  posts: any[] = [
    {
      user: 'احمد حسن',
      time: '2d ago',
      user_image: 'https://i.pravatar.cc/40?img=1',
      content_image: '../../../../../assets/images/posts/class.jpg',
      content:
        'على أتم الاستعداد لخوض امتحان مادة الرياضيات غداً. أتمنى التوفيق والنجاح للجميع! ',
    },
    {
      user: 'احمد حسن',
      time: 'Yesterday',
      user_image: 'https://i.pravatar.cc/40?img=2',
      content_image: '../../../../../assets/images/posts/exam.jpg',
      content:
        'على أتم الاستعداد لخوض امتحان مادة الرياضيات غداً. أتمنى التوفيق والنجاح للجميع! ',
    },
    {
      user: 'احمد حسن',
      time: '2d ago',
      user_image: 'https://i.pravatar.cc/40?img=3',
      content_image: '../../../../../assets/images/posts/final.jpg',
      content:
        'على أتم الاستعداد لخوض امتحان مادة الرياضيات غداً. أتمنى التوفيق والنجاح للجميع! ',
    },
  ];
}
