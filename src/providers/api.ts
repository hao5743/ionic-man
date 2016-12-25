import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers
} from '@angular/http';
import {
  Config
} from './config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Api {
  private hostUrl;
  private requestOpts;
  private config:Config;
  constructor(private http: Http) {
    this.init();
  }
  private init() {
    //获取config单例一个实例
    this.config = Config.getInstance();
    this.hostUrl = this.config.hostURL;
    let headers = new Headers();
    // headers.append('Accept', '*/*');
    // headers.append('Cache-Control', 'no-cache');
    this.requestOpts = new RequestOptions({
      headers: headers
    });
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

  getWithNoParam(url) {
    return this.http.get(this.hostUrl + url)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  get(url: string, params ? : any) {
    if (params) {
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    return this.http.get(this.hostUrl + url, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  post(url, body) {
    return this.http.post(this.hostUrl + url, body, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  put(url, body) {
    return this.http.put(this.hostUrl + url, body, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  delete(url) {
    return this.http.delete(this.hostUrl + url, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  readFromLocalJson(localUrl){
    return this.http.get(localUrl, this.requestOpts)
        .toPromise()
        .then(res => res.json())
        .catch(this.handleError);     
  }

  writeToLocalJson(localUrl, json){
    return this.http.post(localUrl, json, this.requestOpts)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

}