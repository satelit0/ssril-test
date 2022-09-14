import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee/employee.component';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url_base = `${ environment.url_base }/employee/`;

  constructor(
    private http: HttpClient
  ) { }

  getEmployees():Observable<Employee[]> {
    const url = `${this.url_base}getemployee`;
    return this.http.get<Employee[]>(url);

  }

  createEmployee (body: any) {
    const url = `${this.url_base}createEmployee`;
    return this.http.post(url, body);
  }

  updateEmployee (id: number, body: any){
    const url = `${this.url_base}updateemployee/${id}`;
    return this.http.put(url, body);
  }

  deleteEmployee(id:number) {
    const url = `${this.url_base}deleteemployeebyid/${id}`;
    return this.http.delete(url);
  }
}
