import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postProduct(data :any){
    return this.http.post<any>("https://reclamos.onrender.com/reclamoList", data);
  }
  getProduct(){
    return this.http.get<any>("https://reclamos.onrender.com/reclamoList/");
  }
  putReclamo(data:any, id :number){
    return this.http.put<any>("https://reclamos.onrender.com/reclamoList"+id ,data)
  }
  deleteReclamo(id:number){
    return this.http.delete<any>("https://reclamos.onrender.com/reclamoList"+id)
  }
}
