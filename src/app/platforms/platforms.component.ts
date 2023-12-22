import {Component, OnInit} from '@angular/core';
import {RawgService} from "../rawg.service";
import {SearchResult} from "../search-result";

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.css']
})
export class PlatformsComponent implements OnInit{
  platforms: any[] = [];
  currentPage: number = 1;
  totalPlatforms: number = 100;
  pageSize: number = 20;
  totalPages: number = 5;

  searchQuery: string = '';

  constructor(private rawgService: RawgService) { }

  ngOnInit(): void {
    this.loadPlatforms();
  }

  loadPlatforms(): void {
    this.rawgService.getPlatforms(this.currentPage, this.pageSize).subscribe(data => {
      this.platforms = data.results;
      this.totalPlatforms = data.count;
      this.totalPages = Math.ceil(this.totalPlatforms / this.pageSize);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchQuery) {
      this.rawgService.getPlatformsToFilter(this.searchQuery, this.currentPage, this.pageSize).subscribe(searchResult => {
        this.platforms = searchResult.items;
      });
    } else {
      this.loadPlatforms();
    }
  }

}
