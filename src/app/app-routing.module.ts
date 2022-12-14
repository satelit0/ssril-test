import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { DepartamentComponent } from './departament/departament.component';
import { PositionComponent } from './position/position.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'app', component: MainComponent, children: [
      { path: 'employee', component: EmployeeComponent },
      ] },
      { path: '**', redirectTo: 'app/employee' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
