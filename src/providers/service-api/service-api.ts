import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';


/*
  Generated class for the ServiceApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceApiProvider {

  url = "http://www.codemobiles.com/adhoc/youtubes/index_new.php?username=admin&password=password&type=foods";

  constructor(public http: HttpClient) {
    console.log('Hello ServiceApiProvider Provider');
  }

    food():Observable<any>{
      return this.http.get(this.url);
    }
    
}
