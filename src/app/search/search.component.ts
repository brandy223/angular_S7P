import { Component, EventEmitter, Output } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  debounceTime,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from "rxjs";
import { RawgService } from "../rawg.service";
import { JeuxComponent } from "../jeux/jeux.component";
import { Jeu } from "../jeu.interface";
import { NgPlural } from "@angular/common";
import { of } from 'rxjs';
import {SearchResult} from "../search-result";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  searchForm: FormGroup;
  searchCtrl: FormControl<string>;
  optionPlatform: FormControl<string | null>;
  optionPublisher: FormControl<string | null>;

  games: Jeu[] = [];

  @Output() eventOut = new EventEmitter<SearchResult>();

  platforms = [
    { id: 4, name: 'PC' },
    { id: 119, name: 'SEGA CD' },
    { id: 117, name: 'SEGA 32X' },
    { id: 74, name: 'SEGA Master System' },
    { id: 106, name: 'Dreamcast' },
    { id: 111, name: '3DO' },
    { id: 112, name: 'Jaguar' },
    { id: 77, name: 'Game Gear' },
    { id: 12, name: 'Neo Geo' },
    { id: 6, name: 'Linux' },
    { id: 14, name: 'Xbox 360' },
    { id: 80, name: 'Xbox' },
    { id: 16, name: 'PlayStation 3' },
    { id: 15, name: 'PlayStation 2' },
    { id: 27, name: 'PlayStation' },
    { id: 19, name: 'PS Vita' },
    { id: 17, name: 'PSP' },
    { id: 10, name: 'Wii U' },
    { id: 11, name: 'Wii' },
    { id: 105, name: 'GameCube' },
    { id: 83, name: 'Nintendo 64' },
    { id: 24, name: 'Game Boy Advance' },
    { id: 43, name: 'Game Boy Color' },
    { id: 26, name: 'Game Boy' },
    { id: 79, name: 'SNES' },
    { id: 49, name: 'NES' },
    { id: 55, name: 'Classic Macintosh' },
    { id: 41, name: 'Apple II' },
    { id: 166, name: 'Commodore / Amiga' },
    { id: 28, name: 'Atari 7800' },
    { id: 31, name: 'Atari 5200' },
    { id: 23, name: 'Atari 2600' },
    { id: 22, name: 'Atari Flashback' },
    { id: 25, name: 'Atari 8-bit' },
    { id: 34, name: 'Atari ST' },
    { id: 46, name: 'Atari Lynx' },
    { id: 50, name: 'Atari XEGS' },
    { id: 167, name: 'Genesis' },
    { id: 107, name: 'SEGA Saturn' },
];

  publishers = [
      {
        "id": 354,
        "name": "Electronic Arts"
      },
      {
        "id": 308,
        "name": "Square Enix"
      },
      {
        "id": 20987,
        "name": "Microsoft Studios"
      },
      {
        "id": 918,
        "name": "Ubisoft Entertainment"
      },
      {
        "id": 3408,
        "name": "SEGA"
      },
      {
        "id": 3399,
        "name": "Valve"
      },
      {
        "id": 358,
        "name": "2K Games"
      },
      {
        "id": 339,
        "name": "Bethesda Softworks"
      },
      {
        "id": 2150,
        "name": "Capcom"
      },
      {
        "id": 19651,
        "name": "Feral Interactive"
      }
    ];



  constructor(private rawgService: RawgService) {
    this.searchCtrl = new FormControl("", {
      validators: [Validators.required],
      nonNullable: true,
    });
    this.optionPlatform = new FormControl("", null);
    this.optionPublisher = new FormControl("", null);
    this.searchForm = new UntypedFormGroup({
      search: this.searchCtrl,
      optionPlatform: this.optionPlatform,
      optionPublisher: this.optionPublisher,
    });
  }

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(
        filter((searchValue) => searchValue !== ""),
        switchMap((searchValue) => this.submit(searchValue))
      )
      .subscribe((filteredGames) => {
        this.eventOut.emit(filteredGames);
      });

    this.optionPlatform.valueChanges
    .pipe(
      switchMap((idValue) => {
        const platformId = Number(idValue);
        if (!isNaN(platformId)) {
          return this.rawgService.getGamesByPlatform(platformId);
        } else {
          return of([]);
        }
      })
    )
    .subscribe((filteredGames) :any  => {
      this.eventOut.emit(filteredGames);
    });

    this.optionPublisher.valueChanges
    .pipe(
      switchMap((idValue) => {
        const publisherId = Number(idValue);
        if (!isNaN(publisherId)) {
          return this.rawgService.getGamesByPublisher(publisherId);
        } else {
          return of([]);
        }
      })
    ).subscribe((filteredGames)  :any => {
      this.eventOut.emit(filteredGames);
    });
  }

    submit(searchValue: string): Observable<SearchResult> {
        return this.rawgService.getGamesToFilter(searchValue).pipe(
            map(response => {
                return {
                    items: response.items,
                    count: response.count,
                    query: searchValue
                };
            })
        );
    }
}
