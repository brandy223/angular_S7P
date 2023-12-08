import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {JeuxComponent} from "./jeux/jeux.component";
import { Jeu } from './jeu.interface';

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private baseUrl: string = 'https://api.rawg.io/api/games';
  private apiKey: string = '60ed34d7548b41598ab2d6503daa4cb1';

  constructor(private http: HttpClient) { }

  getGames(page: number = 1, pageSize: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}?key=${this.apiKey}&page=${page}&page_size=${pageSize}`);
  }

  getGamesToFilter(search: string = '', page: number = 1, pageSize: number = 20): Observable<Jeu[]> {
    return this.http.get<any>(`${this.baseUrl}?key=${this.apiKey}&search=${search}`).pipe(
        map(response => response.results)
    );
  }

  getGamesContains(search: string): Observable<Jeu[]> {
    return this.getGamesToFilter().pipe(
        map((jeux: Jeu[]) => jeux.filter((el: Jeu) => el.name.toLowerCase().includes(search.toLowerCase())))
    );
  }
}
