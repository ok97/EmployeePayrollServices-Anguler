import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../Service/api.service';
import{EmployeeModel} from './employee-dashboard model';

@Component({
  selector: 'app-emp-dashboard',
  templateUrl: './emp-dashboard.component.html',
  styleUrls: ['./emp-dashboard.component.css']
})
export class EmpDashboardComponent implements OnInit {

formValue !: FormGroup;
employeemodelobj : EmployeeModel=new EmployeeModel();
employeeData !: any;
  constructor(private formbuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName :[''],
      lastName :[''],
      gender :[''],
      department :[''],
      salary :['']
    })
    this.getAllEmployee();
  }
  postEmployeeDetails(){
    this.employeemodelobj.firstName=this.formValue.value.firstName;
    this.employeemodelobj.lastName=this.formValue.value.lastName;
    this.employeemodelobj.gender=this.formValue.value.gender;
    this.employeemodelobj.department=this.formValue.value.department;
    this.employeemodelobj.salary=this.formValue.value.salary;
    this.api.postEmployee(this.employeemodelobj)
    .subscribe(res=>{
      console.log(res);
      alert("Employee Added Successfully")
      let ref=document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Employee Added Failed")
    })
  }

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployeeid(row:any){
  this.api.deleteEmployee(row.id)
  .subscribe(res=>{
    alert("Employee Delete Successfully")
    this.getAllEmployee();
  })
 }
  onUpdate(row:any){
  this.employeemodelobj.id = row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['gender'].setValue(row.gender);
  this.formValue.controls['department'].setValue(row.department);
  this.formValue.controls['salary'].setValue(row.salary);
 }
 updateEmployeeDetails(){
  this.employeemodelobj.firstName=this.formValue.value.firstName;
  this.employeemodelobj.lastName=this.formValue.value.lastName;
  this.employeemodelobj.gender=this.formValue.value.gender;
  this.employeemodelobj.department=this.formValue.value.department;
  this.employeemodelobj.salary=this.formValue.value.salary;

  this.api.updateEmployee(this.employeemodelobj,this.employeemodelobj.id)
  .subscribe(res=>{
    alert("Employee Update Successfully")
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
    });
  
 }
}

