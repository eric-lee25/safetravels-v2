import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {AppService} from "./app.service";
import {Observable, Subject} from "rxjs";

@Injectable()

export class AuthService {


  currentUser: User = null;
  onAuthChange$: Subject<User> = new Subject<User>();


  constructor(private appService: AppService) {

    this.onAuthChange$.subscribe(user => this.currentUser = user);
  }

  login(user: User): Observable<any> {


    let endpoint = '/authenticate?email=' + user.email + '&password=' + user.password;

    return this.appService.get(endpoint).map(res => res.json()).catch(err => Observable.throw(err));
  }

  register(user: User): Observable<any> {

    let endpoint = '/users/register';
    return this.appService.post(endpoint, user).map(res => res.json()).catch(err => Observable.throw(err));


  }

}
