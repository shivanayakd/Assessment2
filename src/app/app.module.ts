import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitComponent } from './commit/commit.component';
import { CommitDetailComponent } from './commit/commit-detail/commit-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CommitComponent,
    CommitDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
