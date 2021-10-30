'use strict'
import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project } from "../models/project";
import { Global } from "./global";

@Injectable()
export class ProjectService{
  public url: string;

  constructor(private _http: HttpClient){
    this.url=Global.url;
  }

  testService(){
    return "Probando el servicio de angular";
  }

  saveProject(project:Project): Observable<any>{
    let params= JSON.stringify(project);
    let header = new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'save-Project',params,{headers:header});

  }

  getProjects(): Observable<any>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'Projects',{headers:header});
  }

  getProject(id:string):Observable<any>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.get(this.url+'Project/'+id,{headers:header});
  }

  deleteProject(id:string):Observable<any>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.delete(this.url+'deleteProject/'+id,{headers:header});
  }

  updateProject(project:any):Observable<any>{
    let params=JSON.stringify(project);
    let id=project._id;
    console.log(project);
    console.log(params);
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url+'updateProject/'+project._id,params,{headers:header});
  }


}
