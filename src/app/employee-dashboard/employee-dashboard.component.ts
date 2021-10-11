import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeModelObj: EmployeeModel = new EmployeeModel();
  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  employeeData !: any;
  // api: any;

  constructor( private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNumber: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe((res: any)=> {
      console.log(res);
      alert("Employee Added Successfully");
      let ref = document.getElementById('cancle');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
      (err: any)=>{
      alert("Something wrong!");
    });
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;

    })
  }

  deleteOneEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    });
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName); 
    this.formValue.controls['lastName'].setValue(row.lastName); 
    this.formValue.controls['email'].setValue(row.email); 
    this.formValue.controls['mobileNumber'].setValue(row.mobileNumber); 
    this.formValue.controls['salary'].setValue(row.salary); 
  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNumber = this.formValue.value.mobileNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancle');
      ref?.click();
      this.getAllEmployee();
    })
  }

}
