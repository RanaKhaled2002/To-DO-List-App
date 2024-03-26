import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {List} from '../interface/list'



@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://note-sigma-black.vercel.app/api/v1/';


  addList(rData:List):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}notes`,rData);
  }

  getUserList():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}notes`);
  }
  
  removeList(listId:string):Observable<any>
  {
    return this._HttpClient.delete(`${this.baseUrl}notes/${listId}`);
  }

  updateList(rData:List,listId:string):Observable<any>
  {
    return this._HttpClient.put(`${this.baseUrl}notes/${listId}`,rData);
  }

}
