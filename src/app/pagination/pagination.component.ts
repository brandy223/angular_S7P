import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  getPagination(): number[] {
    let pages = [];
    if (this.totalPages <= 10) {
      // Moins de 10 pages totales, afficher toutes
      pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      // Plus de 10 pages, calculer les pages à afficher
      const startPages = [1, 2];
      const endPages = [this.totalPages - 1, this.totalPages];
      const middlePages = [this.currentPage - 1, this.currentPage, this.currentPage + 1].filter(p => p > 2 && p < this.totalPages - 1);
      pages = [...new Set([...startPages, ...middlePages, ...endPages])]; // Supprimer les doublons

      if (middlePages[0] > 3) {
        pages.splice(2, 0, -1); // Points de suspension après les premières pages
      }
      if (middlePages[middlePages.length - 1] < this.totalPages - 2) {
        pages.splice(pages.length - 2, 0, -2); // Points de suspension avant les dernières pages
      }
    }
    return pages;
  }


  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
