import { Injectable } from '@angular/core';
import {AppUser} from "../model/user.model";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

    users : AppUser[]=[];
    authenticatedUser:AppUser | undefined;
  constructor() {
    this.users.push({ userId:"1",username: "user1",password:"12345",roles:["USER"]});
        this.users.push({ userId:"2",username: "user2",password:"12345",roles:["USER"]});
      this.users.push({ userId:"999",username: "admin",password:"12345",roles:["USER,ADMIN"]});

  };
    public login(username:string,password:string):Observable<AppUser> {
    let appUSer=this.users.find(u => u.username==username);

    if(!appUSer) return throwError(()=>new Error("User not found"));
    if(appUSer.password!=password) {
        return throwError(() => new Error("Try another password"));
    }
    return of(appUSer);
    }
    public authentificateUser(appUser:AppUser):Observable<boolean> {
      this.authenticatedUser=appUser;
      localStorage.setItem("authUser",JSON.stringify({username:appUser.username , roles : appUser.roles , jwt:"JWT-TOKEN"}));
      return of(true);
    }
    public hasRole(role :string):boolean{
      return this.authenticatedUser!.roles.includes(role);
    }
  public isAuthenticated() {
    let auth = localStorage.getItem("authUser"); // test if the auth user exist in localStoarge
    if(auth) this.authenticatedUser = JSON.parse(auth); // (optional) convert it to JSON and return it value into authenticatedUser to stock the state of auth
    return auth!=undefined; // test if auth is good we return true else return false
  }

   // public isAuthenticated() {
     // console.log(this.authenticatedUser);
      //return this.authenticatedUser!=undefined;
   // }
    public logout():Observable<boolean> {
      this.authenticatedUser=undefined;
      localStorage.removeItem("authUser");
      return of(true);
    }
}
