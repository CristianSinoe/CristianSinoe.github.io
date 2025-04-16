import { Component, OnInit } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  interestsList: Interests[] = [];

  constructor(private interestsService: InterestsService) {}

  ngOnInit(): void {
    this.interestsService.getInterests().subscribe(data => {
      this.interestsList = data;
      console.log(this.interestsList); // verificación en consola
    });
  }
}
