import { Component, OnInit } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model'; 

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  
  educationList: Education[] = [];

  constructor(private educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educationList = data;
      console.log(this.educationList); // Verificar que los datos llegan correctamente
    });
  }
}
