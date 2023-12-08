import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, switchMap} from "rxjs";
import {RawgService} from "../rawg.service";
import {JeuxComponent} from "../jeux/jeux.component";
import {Jeu} from "../jeu.interface";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    searchForm: FormGroup;
    searchCtrl: FormControl<string>

    games: Jeu[] = []

    constructor(private rawgService: RawgService) {
      this.searchCtrl = new FormControl('', {
        validators: [Validators.required],
        nonNullable: true
      })
      this.searchForm = new UntypedFormGroup({
        search: this.searchCtrl
      })
    }

    ngOnInit():void {
      this.rawgService.getGamesToFilter().subscribe(
          (data: any[]) => { console.log(data); this.games = data}
      )

      this.searchCtrl.valueChanges.pipe(
          switchMap( (val: string) => this.rawgService.getGamesContains(val))
      ).subscribe(
          (games: Jeu[]) => this.games = games
      )
    }

  @Output() eventOut = new EventEmitter<Jeu[]>()
  submit() {
    if (this.searchCtrl.value) {
      const searchValue = this.searchCtrl.value.toLowerCase();
      this.rawgService.getGamesToFilter(searchValue).pipe(
          map((jeux: Jeu[]) => jeux.filter(jeu => jeu.name.toLowerCase().includes(searchValue)))
      ).subscribe(filteredGames => {
        this.games = filteredGames;
        console.log(this.games)
        this.eventOut.emit(this.games);
      });
    }
  }
}
