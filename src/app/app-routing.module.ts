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
      { path: 'main', component: MainComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'departament', component: DepartamentComponent },
      { path: 'position', component: PositionComponent },
      { path: '**', redirectTo: 'employee' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
