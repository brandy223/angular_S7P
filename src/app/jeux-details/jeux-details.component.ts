import {Component} from '@angular/core';
import {RawgService} from '../rawg.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {map, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

type GameUrl = {
  website: string,
  metacritic: string
  reddit: string
}

type GameDetails = {
  id: number,
  name: string,
  description: string,
  released: string,
  background_image: string,
  genres: string,
  platforms: string,
  totalRatings: number,
  stores: string,
  urls: GameUrl,
  publishers: string,
  rating: string,
}

@Component({
  selector: 'app-jeux-details',
  templateUrl: './jeux-details.component.html',
  styleUrls: ['./jeux-details.component.css']
})

export class JeuxDetailsComponent {

  private routeSub: Subscription = new Subscription();
  protected gameDetails: GameDetails;

  constructor(private rawgService: RawgService, private modalService: NgbModal, private route: ActivatedRoute, private location: Location) {
    this.gameDetails = {
      id: 0,
      name: "",
      description: "",
      released: "",
      background_image: "",
      genres: "",
      platforms: "",
      totalRatings: 0,
      stores: "",
      urls: {
        website: "",
        metacritic: "",
        reddit: ""
      },
      publishers: "",
      rating: ""
    }
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.gameDetails.id = params['id'];
    });
    this.rawgService.getGamedetails(this.gameDetails.id).pipe(
      map((response: any): GameDetails => {
          // Date
          const date = new Date(response.released);
          const formattedReleaseDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          // Description
          const formattedDescription = (response.description.split('Esp'))[0];

          // Genres
          let genres: string = "";
          response.genres.forEach((genre: any) => {
            genres += genre.name + ", ";
          });
          genres = genres.slice(0, -2);

          // Platforms
          let platforms: string = "";
          response.platforms.forEach((platform: any) => {
            platforms += platform.platform.name + ", ";
          });
          platforms = platforms.slice(0, -2);

          // Ratings
          let totalRatings: number = 0;
          response.ratings.forEach((rating: any) => {
            totalRatings += rating.count;
          });

          // Stores
          let stores: string = "";
          response.stores.forEach((store: any) => {
            stores += store.store.name + ", ";
          });
          stores = stores.slice(0, -2);

          return {
            id: response.id,
            name: response.name,
            description: formattedDescription,
            released: formattedReleaseDate,
            background_image: response.background_image,
            genres: genres,
            platforms: platforms,
            totalRatings: totalRatings,
            stores: stores,
            urls: {
              website: response.website,
              metacritic: response.metacritic_url,
              reddit: response.reddit_url
            },
            publishers: response.publishers[0].name,
            rating: response.rating
          }
        }
      )).subscribe((data: GameDetails) => {
      this.gameDetails = data;
    });
  }

  back(): void {
    this.location.back();
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
}
