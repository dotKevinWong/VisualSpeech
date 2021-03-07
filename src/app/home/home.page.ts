import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Platform } from '@ionic/angular';
import { Word, FirebaseService } from 'src/app/services/firebase.service'
import { Option, OptionService } from 'src/app/services/option.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  words: Word[];
  options: Option[];
 
  constructor(private firebaseService: FirebaseService, public optionService: OptionService,
    private tts: TextToSpeech, public platform: Platform, private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    }
    
  /* 
  OnInit, subscribe to Firebase function getWords()
  and return an array of words from Firebase Firestore  
  */

  ngOnInit() {
    this.firebaseService.getWords().subscribe( words => {
      this.words = words;
    });

    this.optionService.getOptions().subscribe( options => {
      this.options = options;
    })
  }

  

    /* 
    Function: textToSpeech(param: text)
    
    Call this TTS function with a parameter
    of "text"

    Example:
    text = "This is a sentence"
    textToSpeech(text)
    [Application]: "This is a sentence"
    */
    textToSpeech(text) {
      if(this.platform.is('cordova')) {
        /* 
        Uses Cordova Text-to-Speech Plugin. Works with iOS & Android
        */
        this.tts.speak({
          text: text,
          locale: 'en-US',
          rate: 1.7
        })
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason + ". App is saying: " + text));
      } else {
        /* 
        Uses HTML5 SpeechSynthesis API
        https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
        */
        const utter = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(utter);
      }
  }

}
