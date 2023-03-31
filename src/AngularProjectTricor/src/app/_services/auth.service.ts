import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5288/api/account/';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<any> {
    var user = {
      username:username,
      password:password,
    };
    return this.http.post('http://localhost:5288/api/Account/Authenticate',user);
  }
  
   getToken()
  {
        let user_token = this.getUser();
          if( user_token && user_token.accessToken)
          {
            return user_token.accessToken;
          }
          else
          return '';
  }

   getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
