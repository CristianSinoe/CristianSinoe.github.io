import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Languages } from '../../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/Languages';
  languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): Observable<Languages[]> {
    return this.languagesRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) =>
        changes.map((c: DocumentChangeAction<any>) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Languages
        }))
      )
    );
  }
}
