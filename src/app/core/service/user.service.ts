import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {User} from '../interface/user'
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://note-sigma-black.vercel.app/api/v1/';
  userToken:BehaviorSubject<any> = new BehaviorSubject(null);
 
  signupData(rDate:User):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}users/signUp`,rDate);
  }

  signinData(rDate:User):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}users/signIn`,rDate);
  }

  decodeToken()
  {
    if(localStorage.getItem('Token')!=null)
    {
      this.userToken.next(localStorage.getItem('Token'));
      this.userToken.next(jwtDecode(this.userToken.getValue()));
    }
    else
    {
      this.userToken.next(null);
    }
  }

  
}
