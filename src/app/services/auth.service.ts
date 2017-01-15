import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()

export class AuthService {


  constructor(private appService: AppService, private cookieService: CookieService) {

    this.appService.onAuthChange$.subscribe(data => {
      this.appService.currentUser = data.user;
      this.appService.token = data.token;
    });
  }

  login(user: User): Observable<any> {

    let endpoint = '/authenticate?email=' + user.email + '&password=' + user.password;

    return this.appService.get(endpoint).map(res => res.json()).catch(err => Observable.throw(err));
  }

  register(user: User): Observable<any> {

    let endpoint = '/users/register';
    return this.appService.post(endpoint, user).map(res => res.json()).catch(err => Observable.throw(err));


  }

  setCurrentLoginData(data) {

    this.appService.currentUser = data.user;
    this.appService.token = data.token;

    this.appService.onAuthChange$.next(data);

    this.cookieService.putObject('currentLoginData', data);
  }

  getCurrentUser(){

    let data:any = this.cookieService.getObject('currentLoginData');

    if(data.user){
      this.appService.currentUser = data.user;
    }else{

      this.appService.currentUser = null;
    }
  }

  getToken(){

    let data:any = this.cookieService.getObject('currentLoginData');

    if(data.token){
      this.appService.token = data.token;
    }else{

      this.appService.token = "";
    }
  }

}
