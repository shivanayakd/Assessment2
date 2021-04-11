import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnInit, OnChanges {
  @Input() commitsList$:Observable<any[]>;
  @Input() reloaded:boolean = false;
  loadingError$ = new Subject<boolean>();
  errorObject = null;
  commitData: any;

  constructor() { }

  ngOnInit(): void {
    this.errorObject = null;
    this.commitsList$.pipe(
      catchError(err => {
        console.error('error loading the list of Commits', err);
        this.errorObject = err;
        return throwError(err);
      })
    );
  }

  ngOnChanges() {
    this.commitData = "";
  }

}
