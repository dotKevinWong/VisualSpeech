import { Component } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  text_sentences = [];
 
  constructor(
    private tts: TextToSpeech
  ) {
    this.text_sentences = [
      "There is no such thing as fun for the whole family",
      "If you can't have fun, there's no sense in doing it.",
      "Stand up for what is right, regardless of who is committing the wrong."
    ]
  }

  textToSpeech(text) {
    this.tts.speak({
      text: text,
      locale: 'en-US',
      rate: 1.5
     })
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }
}
