import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommitDetailComponent } from './commit-detail/commit-detail.component';

import { CommitComponent } from './commit.component';

describe('CommitComponent', () => {
  let component: CommitComponent;
  let fixture: ComponentFixture<CommitComponent>;
  let COMMITS;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitComponent, CommitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    COMMITS = [{
      "commit": {
          "author": {
              "name": "Zach Arend",
              "email": "zachzach@google.com",
              "date": "2021-03-19T14:56:13Z"
          },
          "committer": {
              "name": "Alex Rickabaugh",
              "email": "alx+alxhub@alxandria.net",
              "date": "2021-03-31T17:03:53Z"
          },
          "message": "feat(language-service): add perf tracing to LanguageService (#41319)\n\nAdds perf tracing for the public methods in LanguageService. If the log level is verbose or higher,\ntrace performance results to the tsServer logger. This logger is implemented on the extension side\nin angular/vscode-ng-language-service.\n\nPR Close #41319",
       },
      "author": {
          "avatar_url": "https://avatars.githubusercontent.com/u/7720245?v=4",
      },
      "committer": {
          "avatar_url": "https://avatars.githubusercontent.com/u/4175141?v=4",
      }
  },{
    "commit": {
        "author": {
            "name": "Razor Bang",
            "email": "razorbang@google.com",
            "date": "2021-03-19T14:56:13Z"
        },
        "committer": {
            "name": "Mike phillipe",
            "email": "mikephilippe@alxandria.net",
            "date": "2021-03-31T17:03:53Z"
        },
        "message": "ci: remove *.bazel from dev-infra ownership (#41382) Historically all .bazel files were owned by dev-infra to assist in ensuring that consistency was maintained in how rules were being used. As this now has reached a point of maturity in the repository where the check is mostly a rubber stamping, this requirement can be removed. Notably this is different than the requirement of dev-infra approval for .bzl files as these contain the implementation of macros rather than just the usage. PR Close #41382",
     },
    "author": {
        "avatar_url": "https://avatars.githubusercontent.com/u/7720245?v=4",
    },
    "committer": {
        "avatar_url": "https://avatars.githubusercontent.com/u/4175141?v=4",
    }
}
]
    fixture = TestBed.createComponent(CommitComponent);
    component = fixture.componentInstance;
  });


  it('Should Render all commits in the commit component', () => {
    component.commitsList$ = of(COMMITS);
    fixture.detectChanges();

    const lis = fixture.nativeElement.querySelectorAll("li");

    expect(lis.length).toBe(2);
  });

});
