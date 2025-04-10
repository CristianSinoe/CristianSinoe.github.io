import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public headerService: HeaderService) {
    console.log(this.headerService);
  }
}
