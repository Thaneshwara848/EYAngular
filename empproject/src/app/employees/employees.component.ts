import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employees.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-employees',
  imports:[CommonModule ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  newEmployee = { uid: '', name: '', age: null, salary: null, designation: '' };
  isEditMode = false;

  constructor(private employeeService : EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data:any) => {
      this.employees = data;
    });
  }

  saveEmployee() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.newEmployee.uid, this.newEmployee)
        .subscribe(() => this.loadEmployees());
    } else {
      this.employeeService.createEmployee(this.newEmployee)
        .subscribe(() => this.loadEmployees());
    }
    this.resetForm();
  }

  editEmployee(employee: any) {
    this.isEditMode = true;
    this.newEmployee = { ...employee };
  }

  deleteEmployee(uid: string) {
    this.employeeService.deleteEmployee(uid).subscribe(() => this.loadEmployees());
  }

  resetForm() {
    this.isEditMode = false;
    this.newEmployee = { uid: '', name: '', age: null, salary: null, designation: '' };
  }
}
