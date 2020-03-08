import { Component, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Word, FirebaseService } from 'src/app/services/firebase.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  words: Word[];
 
  constructor( private firebaseService: FirebaseService,
    private tts: TextToSpeech) { }
    
  /* 
  OnInit, subscribe to Firebase function getWords()
  and return an array of words from Firebase Firestore  
  */

  ngOnInit() {
    this.firebaseService.getWords().subscribe( words => {
      this.words = words;
    });
  }

  /* 
  Function: textToSpeech(param: text)
  
  Call this TTS function with a parameter
  of "text."

  Example:
  sentence = "This is a sentence" 
  textToSpeech(sentence) = "This is a sentence"
  */
  textToSpeech(text) {
    this.tts.speak({
      text: text,
      locale: 'en-US',
      rate: 1.5
     })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason + ". App is saying: " + text));
  }
}
