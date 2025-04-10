import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { WorkExperience } from '../../models/work-experience/work-experience.model'; // Ruta a tu modelo de trabajo

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  accesoWorkExperience = 'work-experience service running...'; // O algún mensaje informativo

  private dbPath = '/work-experience'; // Ruta a tu colección de Firestore

  workExperienceRef: AngularFirestoreCollection<WorkExperience>; // Definimos la referencia a la colección

  constructor(private db: AngularFirestore) {
    this.workExperienceRef = db.collection(this.dbPath); // Inicializamos la referencia a la colección
  }

  // Método que devuelve la colección de "work-experience" desde Firestore
  getWorkExperience(): AngularFirestoreCollection<WorkExperience> {
    return this.workExperienceRef; // Retorna la referencia de la colección
  }
}
