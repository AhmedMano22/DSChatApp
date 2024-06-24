import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'date',
  pure: true,
})
export class CustomDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(timestamp: Timestamp | undefined): string {
    if (!timestamp) {
      return '';
    }

    const date = timestamp.toDate();
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays < 1) {
      return this.datePipe.transform(date, 'hh:mm a') ?? '';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return this.datePipe.transform(date, 'MMM d, y') ?? '';
    }
  }
}
