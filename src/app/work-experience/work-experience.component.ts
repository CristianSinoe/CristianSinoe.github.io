// src/app/work-experience/work-experience.component.ts

import { Component, OnInit } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/compat/firestore'; // Importación del tipo necesario

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {

  workExperienceList: WorkExperience[] = [];

  constructor(public workExperienceService: WorkExperienceService) { }

  ngOnInit(): void {
    // Aquí se agrega el tipo adecuado para 'changes'
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) =>
        changes.map((c: DocumentChangeAction<any>) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        }))
      )
    ).subscribe((data: WorkExperience[]) => {
      this.workExperienceList = data;
      console.log(this.workExperienceList);
    });
  }

}
