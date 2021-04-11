import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommitsService } from './services/commits/commits.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  listOfCommits$:Observable<any[]>;
  title: string = "Git Commits";

  pageNumber: number = 1;
  perPage: number = 15;
  dataReloaded: boolean = false;

  commitsForm = this.fb.group({
    repoName: ['angular/angular', Validators.required],
    fromDate: ['2021-03-01', Validators.required],
    toDate: ['2021-03-31', Validators.required]
  });

  constructor(private commitsservice: CommitsService,private fb: FormBuilder) {}

  ngOnInit() {
    // By Default load all the Git commits of last Month i.e. March
    this.getCommits();
  }

  getCommits() {
    //Reset the pageNumber and Per Page Value on getCommits
    this.pageNumber = 1;
    this.perPage = 15;
    this.triggerGetCommits();
  }

  updatePerpage() {
    this.pageNumber = 1;
    this.triggerGetCommits();
  }

  toPage(type) {
    this.pageNumber = type == "next" ? this.pageNumber + 1: this.pageNumber - 1;
    this.triggerGetCommits();
  }

  triggerGetCommits() {
    const {repoName,fromDate,toDate} = this.commitsForm.value;
    this.listOfCommits$ = this.commitsservice.getcommits(this.pageNumber, this.perPage,repoName, this.formatDate(fromDate), this.formatDate(toDate));
    this.dataReloaded = true;
  }

  formatDate(date) {
    const toDateArr = date.toString().split('-');
    return`${toDateArr[0]}-${toDateArr[2]}-${toDateArr[1]}`;
}
}
