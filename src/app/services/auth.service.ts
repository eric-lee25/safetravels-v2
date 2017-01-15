import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {AppService} from "./app.service";
import {Observable, Subject} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()

export class AuthService {


  currentUser: User = null;
  token: string = "";

  onAuthChange$: Subject<any> = new Subject<any>();


  constructor(private appService: AppService, private cookieService: CookieService) {

    this.onAuthChange$.subscribe(data => {
      this.currentUser = data.user;
      this.token = data.token;
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

    this.currentUser = data.user;
    this.token = data.token;

    this.onAuthChange$.next(data);

    this.cookieService.putObject('currentLoginData', data);
  }

  getCurrentUser(){

    let data:any = this.cookieService.getObject('currentLoginData');

    if(data.user){
      this.currentUser = data.user;
    }else{

      this.currentUser = null;
    }
  }

  getToken(){

    let data:any = this.cookieService.getObject('currentLoginData');

    if(data.token){
      this.token = data.token;
    }else{

      this.token = "";
    }
  }

}
