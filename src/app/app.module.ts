import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { DepartamentComponent } from './departament/departament.component';
import { PositionComponent } from './position/position.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { GenderPipe } from './share/gender.pipe';
import { ConvertDatePipe } from './share/pipes/convert-date.pipe';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartamentComponent,
    PositionComponent,
    GenderPipe,
    ConvertDatePipe,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
