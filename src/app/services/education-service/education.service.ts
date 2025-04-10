import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Education } from '../../models/education/education.model';
import { map } from 'rxjs/operators';  // Importar 'map' correctamente

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private dbPath = '/Education';  // Ruta a la colección 'education'
  educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
    this.educationRef = db.collection(this.dbPath); // Inicializar la referencia de la colección
  }

  // Método que devuelve la colección de "education" desde Firestore
  getEducation(): Observable<Education[]> {
    return this.educationRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) => // Especificar el tipo de 'changes'
        changes.map((c: DocumentChangeAction<any>) => ({
          id: c.payload.doc.id, 
          ...c.payload.doc.data() as Education 
        }))
      )
    );
  }
}
