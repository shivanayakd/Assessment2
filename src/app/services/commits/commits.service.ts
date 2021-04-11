import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  constructor(private http: HttpClient) {}

  getcommits( pageNumber: number, perpage: number,repo: string,fromDate: string,toDate: string):Observable<any[]> {
    return this.http
    .get<any[]>(`https://api.github.com/repos/${repo}/commits?access_token=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&since=${fromDate}&until=${toDate}&per_page=${perpage}&page=${pageNumber}`)
  }
}
