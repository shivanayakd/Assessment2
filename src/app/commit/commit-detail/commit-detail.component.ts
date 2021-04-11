import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-commit-detail',
  templateUrl: './commit-detail.component.html',
  styleUrls: ['./commit-detail.component.scss']
})
export class CommitDetailComponent {
  @Input() commitDetail: any;
}
