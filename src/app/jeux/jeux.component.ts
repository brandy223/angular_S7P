import { Component, OnInit } from '@angular/core';
import { RawgService } from '../rawg.service';
import {Jeu} from "../jeu.interface";
import {SearchResult} from "../search-result";

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {
    games: any[] = [];
    currentPage: number = 1;
    totalGames: number = 100;
    pageSize: number = 20;
    totalPages: number = 5;

    searchQuery: string = '';

    constructor(private rawgService: RawgService) { }

    ngOnInit(): void {
        this.loadGames();
    }

    loadGames(): void {
        this.rawgService.getGames("", this.currentPage, this.pageSize).subscribe(data => {
            this.games = data.items;
            this.totalGames = data.count;
            this.totalPages = Math.ceil(this.totalGames / this.pageSize);
        });
    }



    // Dans JeuxComponent
    onPageChange(page: number): void {
        this.currentPage = page;
        if (this.searchQuery) {
            this.rawgService.getGamesToFilter(this.searchQuery, this.currentPage, this.pageSize).subscribe(searchResult => {
                this.games = searchResult.items;

            });
        } else {
            this.loadGames();
        }
    }


    onEvent(searchResult: SearchResult): void {
        this.games = searchResult.items;
        this.totalGames = searchResult.count;
        this.totalPages = Math.ceil(this.totalGames / this.pageSize);
        this.currentPage = 1;
        this.searchQuery = searchResult.query;
    }

}

