import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {};

  constructor(
    private authObj: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    if (this.user.email && this.user.password) {
      
      this.authObj.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then((res) => {
        console.log(res);
        this.router.navigateByUrl('/home');
      }).catch(e => {
        console.log(e);
      })
      
    }
  }
}
