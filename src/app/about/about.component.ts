import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

}
