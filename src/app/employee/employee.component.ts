import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmptyError, Observable, Subscription } from 'rxjs';
import { EmployeeService } from '../services/employee.service';
import { PositionService } from '../services/position.service';
import { DepartamentService } from '../services/departament.service';
import { Department } from '../share/interfaces/departament.interface';
import * as Notiflix from "notiflix";
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DepartamentComponent } from '../departament/departament.component';
import { PositionComponent } from '../position/position.component';

export interface Employee {
  nombre?: string;
  apellidos?: string;
  id?: number;
  id_departamento?: number;
  sexo?: string;
  fecha_nacimiento?: string;
  id_posicion?: number;
}

export interface GetEmployee {
  id: number;
  nombre: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: string;
  empl_id_departamento: number;
  pos_id_departamento: number;
  pos_id: number;
  descripcion_posicion: string;
  dep_id: number;
  des_departamento: string;
  nom_departamento: string;
}

export interface Position {
  id: number;
  descripcion_posicion: string;
  id_departamento: number;
}

export interface OptionsSex {
  id: string;
  value: string;
}


// luismartinez182013@gmail.com
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50)])),
    last_name: new FormControl("", Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])),
    date_of_birth: new FormControl("", Validators.compose([Validators.required])),
    sex: new FormControl("", Validators.compose([Validators.required, Validators.minLength(1)])),
    departament: new FormControl(0, Validators.compose([Validators.required])),
    position: new FormControl(0, Validators.compose([Validators.required])),
  });
  displayedColumns: string[] = ['no', 'firstName', 'lastName', 'birday', 'gender', 'departament', 'position', 'options'];
  dataSource: Employee[] = [];
  employee!:  Observable<Employee> ;

  descriptionType: Position[] = [];
  department: Department[] = [];
  sex: OptionsSex[] = [
    {
      id: "m",
      value: "Masculino"
    },
    {
      id: "f",
      value: "Femenino"
    }
  ];

  suscription!: Subscription;

  selectedValueDepartment!: string;
  selectedValuePosition!: string;
  selectedCar!: string;
  isDisabledPosition = true;

  isEditable: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private departamentService: DepartamentService,
    private dialog: MatDialog
    ) { }

  ngOnInit(

  ) {
    this.getEmployees();
    this.getDepartaments();
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscription.unsubscribe();
  }

  getDepartaments() {
    this.departamentService.getDepartament().subscribe( resp => {
      this.department = resp;
      console.log(resp)
    });
  }

  openDepartament() {
    this.dialog.open(DepartamentComponent, {
      width: '700px',
      height: '500px'
    });

    this.dialog.afterAllClosed
    .subscribe(() => {
      this.getDepartaments();
    })
  }

  openPosition() {
    this.dialog.open(PositionComponent, {
      width: '700px',
    });
  }

  getEmployees() {
    this.suscription =  this.employeeService.getEmployees().subscribe( resp => {
      this.dataSource = resp;
      console.log(this.dataSource);
    });
  }

  deleteEmployeeById(idEmployee: number) {
    Notiflix.Loading.circle({
      svgSize: "30px"
    });
    this.employeeService
    .deleteEmployee(idEmployee)
    .subscribe(
      (res: any) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.success(res.status);
        this.getEmployees();
      },
      (err: any) => {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(err.status);
      }
    );
  }

  editEmployee(employee: GetEmployee) {
    console.log(employee);
    this.isEditable = true;
    this.updatePositionChange(employee.pos_id_departamento!);
    this.employeeForm.setValue({
      id: employee.id!,
      name: employee.nombre!,
      last_name: employee.apellidos!,
      date_of_birth: moment(employee.fecha_nacimiento!).format('yyyy-MM-DD'),
      sex: employee.sexo!,
      departament: employee.dep_id!,
      position: employee.pos_id!
    });


    console.log(this.employeeForm.value)
  }


  save() {
    Notiflix.Loading.circle({
      svgSize: "30px"
    });

    const {
      id,
      name,
      last_name,
      date_of_birth,
      sex,
      departament,
      position
    } = this.employeeForm.value;

    const body = {
      nombre: name,
      apellidos: last_name,
      fechaNacimiento: date_of_birth,
      sexo: sex,
      idDepartamento: departament,
      idPosicion: position
    };

    if(!this.isEditable) {
      this.employeeService
      .createEmployee(body)
      .subscribe(
        (res: any) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(res.status);
          this.getEmployees();
          this.employeeForm.reset();
        },
        (err: any) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(err.status);
        }
      );
    } else {
      this.employeeService
      .updateEmployee(id, body)
      .subscribe(
        (res: any) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success(res.status);
          this.getEmployees();
          this.isEditable = false;
          this.employeeForm.reset();
        },
        (err: any) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(err.status);
        }
      );
    }
  }

  updatePositionChange(idDepartment: number){
    console.log( idDepartment);
    if (idDepartment ){
      this.suscription = this.positionService.getPositionByIdDepartment(idDepartment).subscribe( resp => {
        if(resp) {
          this.isDisabledPosition = false;
          this.descriptionType = resp;
        }
      });
    }
  }

}
