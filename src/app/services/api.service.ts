import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postProduct(data :any){
    return this.http.post<any>("http://172.16.0.15:3000/reclamoList", data);
  }
  getProduct(){
    return this.http.get<any>("http://172.16.0.15:3000/reclamoList");
  }
  putReclamo(data:any, id :number){
    return this.http.put<any>("http://172.16.0.15:3000/reclamoList"+id ,data)
  }
  deleteReclamo(id:number){
    return this.http.delete<any>("http://172.16.0.15:3000/reclamoList"+id)
  }
}
