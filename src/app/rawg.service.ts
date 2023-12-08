import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private baseUrl: string = 'https://api.rawg.io/api/games';
  private apiKey: string = '60ed34d7548b41598ab2d6503daa4cb1';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(`${this.baseUrl}?key=${this.apiKey}`);
  }
}
