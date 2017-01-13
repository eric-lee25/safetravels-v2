import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Injectable()

export class AuthService {


  currentUser: User = null;


  constructor(private appService: AppService) {


  }

  login(user: User) {


  }

  register(user: User): Observable<any> {

    let endpoint = '/users/register';
    return this.appService.post(endpoint, user).map(res => res.json()).catch(err => Observable.throw(err));



  }

}
