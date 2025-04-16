import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Skills } from '../../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/Skills';
  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): Observable<Skills[]> {
    return this.skillsRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) =>
        changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Skills
        }))
      )
    );
  }
}
