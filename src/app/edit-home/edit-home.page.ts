import { Component, OnInit } from '@angular/core';
import { Word, FirebaseService } from 'src/app/services/firebase.service'


@Component({
  selector: 'app-edit-home',
  templateUrl: './edit-home.page.html',
  styleUrls: ['./edit-home.page.scss'],
})
export class EditHomePage implements OnInit {

  words: Word[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getWords().subscribe( words => {
      this.words = words;
      console.log(this.words)
    });
  }

}
