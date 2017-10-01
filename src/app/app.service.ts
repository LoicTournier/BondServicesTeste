import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Country} from './app.component';
import {TypeOfShareholder} from './app.component';
import {Shareholder} from './app.component';


@Injectable()
export class CountryService {
  constructor(private _http: Http) {
  }

  getPaises() {
    return <Observable<Country[]>>
      this._http
        .get('/v2/59d1132d1200003101244e8e')
        .map(this.extractData)
        .catch(this.handleError);
  }

  getTipoAcionista() {
    return <Observable<TypeOfShareholder[]>>
      this._http
        .get('/v2/59d1143a1200003e01244e91')
        .map(this.extractData)
        .catch(this.handleError);
  }


  // THIS ENDPOINT DOES NOT WORK, RESPONSE IS BLANK
  getShareholder() {
    return <Observable<Shareholder[]>>
      this._http
        .get('/v2/59d1158a1200004301244e92')
        .map(this.extractData)
        .catch(this.handleError);
  }

  // This method gets the data
  private extractData(res: Response) {
    let body = res.json();
    console.log(body);
    return body || {};
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
