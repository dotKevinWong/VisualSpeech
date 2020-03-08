import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Word {
  id?: string,
  name?: string,
  icon: string,
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private words: Observable<Word[]>;
  private wordCollection: AngularFirestoreCollection<Word>;

  constructor(private afs: AngularFirestore) { 
    this.wordCollection = this.afs.collection<Word>('words');
    this.words = this.wordCollection.snapshotChanges().pipe(
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
  getWords(): Observable<Word[]> {
    return this.words;
  }

  getWord(id: string): Observable<Word> {
    return this.wordCollection.doc<Word>(id).valueChanges().pipe(
      take(1),
      map(word => {
        word.id = id;
        return word
      })
    );
  }

  addWord(word: Word): Promise<DocumentReference> {
    return this.wordCollection.add(word);
  }

  updateWord(word: Word): Promise<void> {
    return this.wordCollection.doc(word.id).update({ name: word.name, icon: word.icon });
  }

  deleteWord(id: string): Promise<void> {
    return this.wordCollection.doc(id).delete();
  }

}
