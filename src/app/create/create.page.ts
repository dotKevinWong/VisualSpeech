import { Component, Input, OnInit } from '@angular/core';
import { Word, FirebaseService } from 'src/app/services/firebase.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  word: Word = {
    name: '',
    icon: '',
    photoUri: '',
    user: this.afAuth.auth.currentUser.uid,
  };

  constructor(private activatedRoute: ActivatedRoute, private firebaseService: FirebaseService,
    private toastCtrl: ToastController, private router: Router, private location: Location, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.firebaseService.getWord(id).subscribe(word => {
        this.word = word;
      })
    }
  }

  addWord() {
    this.firebaseService.addWord(this.word).then(() => {
      this.location.back();
      this.showToast('Word added');
    }, err => {
      this.showToast('There was a problem adding your word :(');
    });
  }

  deleteWord() { 
    this.firebaseService.deleteWord(this.word.id).then(() => {
      this.location.back();
      this.showToast('Word deleted');
    }, err => {
      this.showToast('There was a problem deleting your word :(');
    });
  }

  updateWord() { 
    this.firebaseService.updateWord(this.word).then(() => {
      this.location.back();
      this.showToast('Word updated');
    }, err => {
      this.showToast('There was a problem deleting your word :(');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }
  
}
