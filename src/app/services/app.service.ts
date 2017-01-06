import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AppService {

  sidebarProgressToggle: Subject<boolean> = new Subject<boolean>();

  private serverURL: string = "/assets/data"; // change to your api server like http://domain.com/api

  private headers: Headers = new Headers(
    {
      'Content-Type': 'application/json'
    }
  );

  constructor(private http: Http) {

  }


  getUrl(url: string): string {

    return this.serverURL + url;
  }

  getOptions(options: RequestOptionsArgs): RequestOptionsArgs {

    let op = {headers: this.headers};

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
