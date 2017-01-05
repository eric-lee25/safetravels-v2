import { Injectable } from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Injectable()
export class UserService {

  constructor(private api: AppService) { }



  getProfile(): Observable<any>{

    return this.api.get('/account.json').map(res => res.json()).catch(err => Observable.throw(err));

  }

}
