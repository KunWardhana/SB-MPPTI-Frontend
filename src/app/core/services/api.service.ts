import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  userData: any;

  constructor(private readonly httpClient: HttpClient) {}

  // article
  // add article
  addArticle(data: any) {
    const url = `${environment.backendUrl}information`;
    return this.httpClient.post(url, data);
  }

  // Sign out
  signOut() {}
}
