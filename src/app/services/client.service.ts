import { HttpClient, HttpErrorResponse, HttpHeaders } from
'@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { User } from '../models/User';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
private apiServerUrl = 'http://localhost:6868/login';
constructor(private _http: HttpClient,private http: HttpClient) { }
postUser(aUser:any):Observable<any>
{
const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
const requestOptions:Object={
headers:headers,
responseType:"text"
}
return this._http.post<any>("http://localhost:6868/users",JSON.stringify(aUser),requestOptions).pipe(
map(res=>JSON.parse(res) as Array<User>),
retry(3),
)
}


postLogin(UserName: string, Password: string): Observable<any> {
  const headers = new HttpHeaders().set("Content-Type", "application/json");
  const requestOptions: Object = {
    headers: headers,
    responseType: "text"
  };
  return this._http.post<any>("http://localhost:6868/login",{ UserName: UserName,Password:Password}, requestOptions).pipe(
    map((res) => JSON.parse(res) as User),
    retry(3),
    catchError(this.handleError)
  );
}
private handleError(error: HttpErrorResponse) {
  return throwError(() => new Error(error.message));
}
}

