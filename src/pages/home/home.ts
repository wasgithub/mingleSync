import { LoginPage } from './../login/login';
import { LoginService } from './../../providers/login.service';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _loginService: LoginService, private _app: App) {

  }
  logout() {
    this._loginService.signOut().subscribe(
      () => {
        this._app.getRootNav().setRoot(LoginPage);
        console.log("Usuário deslogado");
      }
    );
  }
}
