import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {User} from "../models/user.model";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";

@Injectable()
export class AppService {

  dialogTitle: string = "";
  sidebarProgressToggle: Subject<boolean> = new Subject<boolean>();
  sidebarToggle: Subject<boolean> = new Subject<boolean>();
  dialogTitleEvent: Subject<string> = new Subject<string>();
  onAuthChange$: Subject<any> = new Subject<any>();


  public currentUser: User = null;
  public token: string = "";

  userEvent: Subject<User> = new Subject<User>();

  confirmationDialogConfig = {
    title: "",
    message: "",
    actionTitle: "OK",
    buttonClass: "btn-primary"
  };
  confirmationDialogConfigEvent: Subject<any> = new Subject<any>();


  messageDialogConfig = {
    title: "",
    message: "",
  };

  messageDialogEvent: Subject<any> = new Subject<any>();

  configStorage = {
    sidebarCollapsed: true
  };

  notification: any = {
    message: '',
    type: 'success'
  };

  notificationEvent: Subject<any> = new Subject<any>();

  public showLandingPage: boolean = false;
  showLandingPageEvent: Subject<boolean> = new Subject<boolean>();

  public serverURL: string = "http://newapi.safetravels.com"; // change to your api server like http://domain.com/api


  private headers: Headers = new Headers(
    {
      'Content-Type': 'application/json'
    }
  );

  uploadConfig: DropzoneConfigInterface = {
    server: this.serverURL + '/me/avatar',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    headers: {"Authorization": "bearer " + this.token}
  };

  uploadConfigEvent: Subject<DropzoneConfigInterface> = new Subject<DropzoneConfigInterface>();


  constructor(private http: Http) {

    let config = localStorage.getItem("configStorage");
    if (config) {
      this.configStorage = JSON.parse(config);
    }
    if (this.configStorage.sidebarCollapsed !== null) {
      this.sidebarToggle.next(this.configStorage.sidebarCollapsed);
    }

    this.sidebarToggle.subscribe(collapsed => {
      console.log(collapsed);

      this.configStorage.sidebarCollapsed = collapsed;
      localStorage.setItem('configStorage', JSON.stringify(this.configStorage));
    });


    this.dialogTitleEvent.subscribe(title => this.dialogTitle = title);

    this.confirmationDialogConfigEvent.subscribe(config => {
      this.confirmationDialogConfig = Object.assign(this.confirmationDialogConfig, config);
    });


    this.messageDialogEvent.subscribe(config => {
      this.messageDialogConfig = Object.assign(this.messageDialogConfig, config);

    });

    this.showLandingPageEvent.subscribe(value => this.showLandingPage = value);


    this.onAuthChange$.subscribe(data => {

      let tokenKey = data.token;

      this.token = tokenKey;

      this.currentUser = data.user;

      this.userEvent.next(this.currentUser);

      if (tokenKey) {
        this.headers.set("Authorization", "bearer " + tokenKey);
        this.uploadConfig.headers = {"Authorization": "bearer " + tokenKey};
      } else {
        this.headers.delete("Authorization");
      }


    });


    // upload event

    this.uploadConfigEvent.subscribe(config => {

      this.uploadConfig.headers = this.uploadConfig.headers = {"Authorization": "bearer " + this.token};

      this.uploadConfig = Object.assign(this.uploadConfig, config);
    });


    this.userEvent.subscribe(user => this.currentUser = user);

    this.notificationEvent.subscribe(notification => this.notification = Object.assign(this.notification, notification));

  }


  getUrl(url: string): string {

    return this.serverURL + url;
  }

  getOptions(options: RequestOptionsArgs): RequestOptionsArgs {

    let op = {headers: this.headers};


    if (this.token) {
      op.headers.set("Authorization", "bearer " + this.token);
    } else {
      op.headers.delete("Authorization");
    }


    if (options) {
      return Object.assign(op, options);
    }

    return op;
  }

  get(endpoint: string, options?: RequestOptionsArgs): Observable<Response> {

    let url = this.getUrl(endpoint);

    let op = this.getOptions(options);

    return this.http.get(url, op);
  }

  /**
   * Performs a request with `post` http method.
   */
  post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

    let url = this.getUrl(endpoint);
    let op = this.getOptions(options);
    return this.http.post(url, body, op);
  }

  /**
   * Performs a request with `put` http method.
   */
  put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

    let url = this.getUrl(endpoint);
    let op = this.getOptions(options);
    return this.http.put(url, body, op);
  }

  /**
   * Performs a request with `delete` http method.
   */
  delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response> {

    let url = this.getUrl(endpoint);
    let op = this.getOptions(options);
    return this.http.delete(url, op);
  }

}
