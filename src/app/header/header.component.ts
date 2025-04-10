import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service'; 
import { HeaderService } from '../services/header-service/header.service';
import { Header } from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  header: Header = new Header();
  // Inicializamos skills
  skills: { [key: string]: string } = {lenguajes: '', tecnologias: ''};

  constructor(
    public headerService: HeaderService,
    private skillsService: SkillsService
  ) {
    console.log(this.headerService);

    this.headerService.getHeader().snapshotChanges().pipe(
      map ((changes: any[]) => { // Definimos explícitamente que 'changes' es una arreglo de tipo 'any'
        return changes.map(c => {
          return {id: c.payload.doc.id, ...c.payload.doc.data() };
        });
      })
    ).subscribe((data: any) => { // 'data' tambien es de tipo 'any'
      this.header = data[0]; // Asignamos el primer elemento de la respuesta de Firestore
      console.log(this.header);
    });
  }
}
