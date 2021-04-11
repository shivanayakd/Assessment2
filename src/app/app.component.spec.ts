import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CommitsService } from './services/commits/commits.service';

describe('AppComponent', () => {
  let mockCommitsService;
  let fixture: ComponentFixture<AppComponent>;
  let COMMITS;
  let app: AppComponent;

  beforeEach(async () => {
    mockCommitsService = jasmine.createSpyObj(["getcommits"]);
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

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: CommitsService, useValue: mockCommitsService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar #logo').textContent).toBe('Git Commits');
  });

  it('Should Get the Formatted date as expected', () => {
    expect(app.formatDate("2021-03-31")).toEqual("2021-31-03");
  });

  it('Should Get all the git commits On triggerGetCommits', () => {
    let list;
    mockCommitsService.getcommits.and.returnValue(of(COMMITS));

    app.triggerGetCommits();
    app.listOfCommits$.subscribe((data) => {
      list = data;
    })
    expect(list.length).toBe(2);
  });

  it('Should Check if Navigating to Next Page', () => {
    app.pageNumber = 1;
    spyOn(app, "triggerGetCommits");

    app.toPage("next");

    expect(app.pageNumber).toBe(2);
    expect(app.triggerGetCommits).toHaveBeenCalled();
  });


  it('Should Check if Navigating to Previous Page', () => {
    app.pageNumber = 2;
    spyOn(app, "triggerGetCommits");

    app.toPage("prev");

    expect(app.pageNumber).toBe(1);
    expect(app.triggerGetCommits).toHaveBeenCalled();
  });

  it('Should Get Fresh git Commits on getCommits', () => {
    spyOn(app, "triggerGetCommits");

    app.getCommits();

    expect(app.pageNumber == 1 && app.perPage == 15).toBeTruthy()
    expect(app.triggerGetCommits).toHaveBeenCalled();
  });
});
