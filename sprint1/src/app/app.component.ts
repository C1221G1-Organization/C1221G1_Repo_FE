import {Component} from '@angular/core';
import {TokenStorageService} from "./service/security/token-storage.service";
import firebase from "firebase/app";
import "firebase/database";
import {config, environment} from "../environments/environment";
@Component({
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : ['./app.component.css']
})
export class AppComponent {
  title = 'pharmacy-manager';

  isGuest = true;
  user;

  constructor(private tokenStorageService: TokenStorageService) {
    firebase.initializeApp(config);
    this.user = this.tokenStorageService.getUser();
    if (this.user == null) {
      this.isGuest = true;
    }
    if (this.user != null) {
      if (this.user.roles[0] == "ROLE_USER") {
        this.isGuest = true;
      } else {
        this.isGuest = false;
      }
    }
    console.log(this.user);
  }

}
