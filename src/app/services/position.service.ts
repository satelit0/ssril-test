import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Position } from '../employee/employee.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  private url_base = `${environment.url_base}/position`

  constructor(
    private http: HttpClient
  ) { }

 getPosition() {

  return this.http.get<Position[]>(`${this.url_base}/getpositions`);

 }
 getPositionByIdDepartment(idDepartment: number) {

  return this.http.get<Position[]>(`${this.url_base}/getpositionbyiddepartment/${idDepartment}`);

 }




}
