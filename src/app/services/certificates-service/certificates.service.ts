import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Certificates } from '../../models/certificates/certificates.model';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  private dbPath = '/certificates';
  certificatesRef: AngularFirestoreCollection<Certificates>;

  constructor(private db: AngularFirestore) {
    this.certificatesRef = db.collection(this.dbPath);
  }

  getCertificates(): Observable<Certificates[]> {
    return this.certificatesRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<any>[]) =>
        changes.map((c: DocumentChangeAction<any>) => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data() as Certificates
        }))
      )
    );
  }
}
