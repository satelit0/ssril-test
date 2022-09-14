import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Department } from '../share/interfaces/departament.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {
  private url_base = `${environment.url_base}/department`;
  constructor(
    private http: HttpClient
  ) { }

  getDepartament(){
    const url = `${ this.url_base }/getdepartment`;
    return this.http.get<Department[]>(url);
  }

  createDepartament(body: Department){
    const url = `${ this.url_base }/create`;
    return this.http.post<Department>(url, body);
  }

}
