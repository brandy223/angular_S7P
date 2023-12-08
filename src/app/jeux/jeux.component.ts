import { Component, OnInit } from '@angular/core';
import { RawgService } from '../rawg.service';

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

    constructor(private rawgService: RawgService) { }

    ngOnInit(): void {
        this.loadGames();
    }

    loadGames(): void {
        this.rawgService.getGames(this.currentPage, this.pageSize).subscribe(data => {
            this.games = data.results;
            this.totalGames = data.count;
            this.totalPages = Math.ceil(this.totalGames / this.pageSize);
        });
    }

    onPageChange(page: number): void {
        this.currentPage = page;
        this.loadGames();
    }

    onEvent = (event: any) => {
        this.games = event;
    };
}

