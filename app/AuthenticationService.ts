import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';




export class User{
    email:string;
    name:string;
    subscribe:boolean;
}

@Injectable()
export class AuthService{
 currentUser: User;
 private apiURL =environment.webApiURL;
  s_userInfo:EventEmitter<User> = new EventEmitter<User>();

  constructor(private http:Http){}

  public login(_input) {
     

    
     return this.http.get(this.apiURL+'/user/'+ _input).map(
       response=>{
          if(response.json() == null ){

            return null;
          }
          else
          {
           //we call .json method on the response because the actual response is not a collection of data but a JSON string.
            var responseObj = response.json();//.json();
             let user:User = new User();
            
            user.email =  responseObj.email;
            user.name = responseObj.user;

            this.s_userInfo.emit(user);

           
            return user;
            }
       }
     );
  }

  public register(credentials) {

      return this.http.post(this.apiURL+'/register', credentials).map(

        response=>{
            
            return response;

        }
      )
  }
 
  /*public getUserInfo(id: number) {
    return this.http.get(this.apiURL+'/Users/'+id).map(
      response=>{
         return response;

      }


    );//this.currentUser;
  }*/
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}