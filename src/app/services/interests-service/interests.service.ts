import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interests } from '../../models/interests/interests.model';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  private dbPath = '/Interests';
  interestsRef: AngularFirestoreCollection<Interests>;

  constructor(private db: AngularFirestore) {
    this.interestsRef = db.collection(this.dbPath);
  }

  getInterests(): Observable<Interests[]> {
    return this.interestsRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) =>
        changes.map((c: DocumentChangeAction<any>) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Interests
        }))
      )
    );
  }
}
