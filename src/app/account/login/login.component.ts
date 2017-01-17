import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";
import {User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {DialogService} from "../../services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  user: User = new User();


  constructor(private appService: AppService,
              private dialogService: DialogService,
              private router: Router,
              private auth: AuthService) {


    let data = {token: "", user: null};

    this.auth.setCurrentLoginData(data);

  }

  ngOnInit() {
    this.appService.showLandingPageEvent.next(true);
  }

  ngOnDestroy() {
    this.appService.showLandingPageEvent.next(false);
  }


  onSubmit() {


    console.log("Login data", this.user);

    if (this.user.email == "" || this.user.password == "" || !this.user.email || !this.user.password) {
      let title = "Login Error";
      let msg = "The email and password must required";

      this.dialogService.showMessageDialog(title, msg);

      return;
    }

    this.auth.login(this.user).subscribe(res => {

      this.auth.setCurrentLoginData(res);
      this.router.navigate(['/home']);

    }, err => {
      console.log("login error: ", err);
      this.dialogService.showMessageDialog("Login Error", err.json().message);

    });

  }
}
