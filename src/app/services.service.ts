import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private url = 'http://localhost:3000/api/employee'

  constructor(
    private http: HttpClient
  ) { }

  getEmployees() {

    return this.http.get(`${this.url}`);

  }

}
