import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss'],
})
export class SharedCardComponent {
  @Input() Item: any;
  @Input() baseRoute!: string;
}
