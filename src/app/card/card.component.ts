import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {RawgService} from "../rawg.service";
import {SearchResult} from "../search-result";
import {Jeu} from "../jeu.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() item: any;
  @Input() type: 'game' | 'platform' = 'game';
  @Output() redirectOut = new EventEmitter<SearchResult<Jeu>>();
  constructor(private router: Router, private rawgService: RawgService) { }

    redirectToDetails(): void {
        if (this.type === 'platform') {
          this.router.navigate(['/jeux']).then(r => {
            console.log('Navigation successful:', r);
          }).catch(error => {
            console.error('Navigation failed:', error);
          });
          console.log(this.item.id)
          this.rawgService.getGames("", 1, 20, this.item.id).subscribe(data => {
              this.redirectOut.emit(data);
              console.log("emit");
          });
    }
  }
}
