import { Component, OnInit } from '@angular/core';
import { RawgService } from '../rawg.service';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
  styleUrls: ['./jeux.component.css']
})
export class JeuxComponent implements OnInit {
  games: any[] = [];

  constructor(private rawgService: RawgService) {
  }

  ngOnInit(): void {
    this.rawgService.getGames().subscribe(
        data => {
          this.games = data.results;
        },
        error => {
          console.error('Erreur lors de la récupération des jeux', error);
        }
    );
  }
}
