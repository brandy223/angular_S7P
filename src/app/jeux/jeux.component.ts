import { Component, OnInit } from '@angular/core';
import { RawgService } from '../rawg.service';
import {SearchResult} from "../search-result";
import {Jeu} from "../jeu.interface";

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {
    searchResult: SearchResult<Jeu>
    currentPage: number = 1;
    pageSize: number = 20;
    totalPages: number = 5;

    constructor(private rawgService: RawgService) {
      this.searchResult = {
        items: [],
        count: 100,
        query: ''
      };
    }

    ngOnInit(): void {
        const item = localStorage.getItem('lastQuery');
        if (!item) {
            this.loadGames();
            return;
        }
        this.searchResult = JSON.parse(item);
        setTimeout(() => {
          localStorage.removeItem('lastQuery');
        }, 500);
    }

    loadGames(): void {
        this.rawgService.getGames("", this.currentPage, this.pageSize).subscribe(data => {
            this.searchResult.items = data.items;
            this.searchResult.count = data.count;
            this.totalPages = Math.ceil(this.searchResult.count / this.pageSize);
        });
    }

    // Dans JeuxComponent
    onPageChange(page: number): void {
        this.currentPage = page;
        if (this.searchResult.query) {
            this.rawgService.getGamesToFilter(this.searchResult.query, this.currentPage, this.pageSize).subscribe(searchResult => {
                this.searchResult.items = searchResult.items;

            });
        } else {
            this.loadGames();
        }
    }


    onEvent(searchResult: SearchResult<Jeu>): void {
        this.searchResult.items = searchResult.items;
        this.searchResult.count = searchResult.count;
        this.searchResult.query = searchResult.query;
        this.totalPages = Math.ceil(this.searchResult.count / this.pageSize);
        this.currentPage = 1;
        localStorage.setItem('lastQuery', JSON.stringify(this.searchResult));
    }

    onRedirectToDetails(searchResult: SearchResult<Jeu>): void {
        console.log("onRedirectToDetails");
        this.searchResult.items = searchResult.items;
        this.searchResult.count = searchResult.count;
        this.totalPages = Math.ceil(this.searchResult.count / this.pageSize);
        this.currentPage = 1;
        // localStorage.setItem('lastQuery', JSON.stringify(this.searchResult));
    }
}
