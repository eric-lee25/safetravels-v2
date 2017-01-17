import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UserService {

  constructor(private api: AppService) {
  }


  getProfile(): Observable<any> {

    return this.api.get('/me').map(res => res.json()).catch(err => Observable.throw(err));

  }

  update(user: User): Observable<any> {

    return this.api.put('/me', user).map(res => res.json()).catch(err => Observable.throw(err));

  }

}
