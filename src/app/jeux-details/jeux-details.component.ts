import {Component} from '@angular/core';
import {RawgService} from '../rawg.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-jeux-details',
  templateUrl: './jeux-details.component.html',
  styleUrls: ['./jeux-details.component.css']
})
export class JeuxDetailsComponent {
  private routeSub: Subscription = new Subscription();
  gameDetails: any = {};
  formattedReleaseDate: string = "";
  formattedDescription: string = "";
  gameId: number = 0;
  genres: string = "";
  platforms: string = "";
  stores: string = "";
  totalRatings: number = 0;

  constructor(private rawgService: RawgService, private modalService: NgbModal, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameId = params['id'];
    });
    // TODO : Remove deprecated method !
    this.rawgService.getGamedetails(this.gameId).subscribe(
      data => {
        this.gameDetails = data;
        // TODO : Need pipe to remove unused data
        console.log(this.gameDetails);
        const date = new Date(this.gameDetails.released);
        this.formattedReleaseDate = date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
        this.formattedDescription = (this.gameDetails.description.split('Esp'))[0];

        this.gameDetails.genres.forEach((genre: any) => {
          this.genres += genre.name + ", ";
        });
        this.genres = this.genres.slice(0, -2);

        this.gameDetails.platforms.forEach((platform: any) => {
          this.platforms += platform.platform.name + ", ";
        });
        this.platforms = this.platforms.slice(0, -2);

        this.gameDetails.ratings.forEach((rating: any) => {
          this.totalRatings += rating.count;
        });

        this.gameDetails.stores.forEach((store: any) => {
          this.stores += store.store.name + ", ";
        });
        this.stores = this.stores.slice(0, -2);
      },
      error => {
        console.error('Erreur lors de la récupération des jeux', error);
      }
    );
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
