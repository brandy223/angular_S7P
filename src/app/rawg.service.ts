import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Jeu } from './jeu.interface';
import {SearchResult} from "./search-result";
import {Plateforme} from "./platform.interface";

@Injectable({
  providedIn: 'root'
})
export class RawgService {
  private baseUrl: string = 'https://api.rawg.io/api';
  private apiKey: string = '60ed34d7548b41598ab2d6503daa4cb1';

  constructor(private http: HttpClient) { }

  getGames(search: string, platform?: number, publisher?: number, genre?: number, page: number = 1, pageSize: number = 20): Observable<SearchResult<Jeu>> {
        let queryParams = `key=${this.apiKey}&page=${page}&page_size=${pageSize}`;

        if (search) {
            queryParams += `&search=${search}`;
        }
        if (platform !== undefined) {
            queryParams += `&platforms=${platform}`;
        }
        if (publisher !== undefined) {
            queryParams += `&publishers=${publisher}`;
        }
        if (genre !== undefined) {
            queryParams += `&genres=${genre}`;
        }

        return this.http.get<any>(`${this.baseUrl}/games?${queryParams}`).pipe(
            map(response => {
                return { items: response.results, count: response.count, query: search };
            })
        );
    }

  getPlatforms(page: number = 1, pageSize: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/platforms?key=${this.apiKey}&page=${page}&page_size=${pageSize}`);
  }

  getGamedetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/games/${id}?key=${this.apiKey}`);
  }

  getGamesToFilter(search: string = '', page: number = 1, pageSize: number = 20): Observable<SearchResult<Jeu>> {
    return this.http.get<any>(`${this.baseUrl}/games?key=${this.apiKey}&search=${search}&ordering=-rating&page=${page}&page_size=${pageSize}`).pipe(
        map(response => {
          return { items: response.results, count: response.count, query: search};
        })
    );
  }

  getPlatformsToFilter(search: string = '', page: number = 1, pageSize: number = 20): Observable<SearchResult<Plateforme>> {
    return this.http.get<any>(`${this.baseUrl}/platforms?key=${this.apiKey}&search=${search}&page=${page}&page_size=${pageSize}`).pipe(
        map(response => {
          return { items: response.results, count: response.count, query: search};
        })
    );
  }
/*
  getGamesByPlatform(platform: number, page: number = 1, pageSize: number = 20 ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/games?key=${this.apiKey}&page=${page}&page_size=${pageSize}&platforms=${platform}`).pipe(
        map(response => {
          return { items: response.results, count: response.count, query: platform};
        })
    );
  }

  getGamesByPublisher(publisher: number, page: number = 1, pageSize: number = 20 ): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/games?key=${this.apiKey}&page=${page}&page_size=${pageSize}&publishers=${publisher}`).pipe(
        map(response => {
          return { items: response.results, count: response.count, query: publisher};
        })
    );
  }

    getGamesByGenre(genre: number, page: number = 1, pageSize: number = 20 ): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/games?key=${this.apiKey}&page=${page}&page_size=${pageSize}&genres=${genre}`).pipe(
            map(response => {
                return { items: response.results, count: response.count, query: genre};
            })
        );
    }

  /*getGamesContains(search: string): Observable<Jeu[]> {
  return this.getGamesToFilter().pipe(
      map((jeux: Jeu[]) => jeux.filter((el: Jeu) => el.name.toLowerCase().includes(search.toLowerCase())))
  );
}*/
}
