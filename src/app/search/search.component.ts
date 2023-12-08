import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {debounceTime, filter, map, Observable, startWith, switchMap, tap} from "rxjs";
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

    @Output() eventOut = new EventEmitter<Jeu[]>()
    ngOnInit(): void {
        this.searchCtrl.valueChanges.pipe(
            filter(searchValue => searchValue !== ''),
            switchMap(searchValue => this.submit(searchValue))
        ).subscribe(filteredGames => {
            this.games = filteredGames;
            this.eventOut.emit(this.games);
        });
    }

    submit(searchValue: string): Observable<Jeu[]> {
        return this.rawgService.getGamesToFilter(searchValue);
    }
}
