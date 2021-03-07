import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export interface Option {
  id?: string,
  locale: string,
  rate: string,
  user: string
}

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private options: Observable<Option[]>;
  private optionCollection: AngularFirestoreCollection<Option>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {
    this.optionCollection = this.afs.collection<Option>('settings', ref => ref.where("user", "==", this.afAuth.auth.currentUser.uid));
    this.options = this.optionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  /* Global functions for Firestore Calls */
  getOptions(): Observable<Option[]> {
    return this.options;
  }

  getOption(id: string): Observable<Option> {
    return this.optionCollection.doc<Option>(id).valueChanges().pipe(
      take(1),
      map(option => {
        option.id = id;
        return option
      })
    );
  }

  updateOption(option: Option): Promise<void> {
    return this.optionCollection.doc(option.id).update({ locale: option.locale, rate: option.rate });
  }

}
