import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { StockCompany } from 'src/app/class/stock-company';
import { EstockservicesService } from 'src/app/services/estockservices.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  dataSaved = false;      
  employeeIdUpdate = null;  
  message = "";
  companyForm: any;
  teststring : string = "";
  constructor(private formbulider: UntypedFormBuilder, private estockservices:EstockservicesService) { }
  initialValue : number  = 1000000;
  ngOnInit(): void {
    this.companyForm = this.formbulider.group({  
      companyCode : ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      companyCEO: ['', [Validators.required]],
      companyWebsite: ['', [Validators.required]],
      companyTurnOver: ['', [Validators.min(this.initialValue)]],
      stockExchange:['', [Validators.required]],
      updatedBy: ['', [Validators.required]]      
    });  
  }



 onFormSubmit(companyForm : Observable<StockCompany[]> ) {  
   // console.log("entered ng submit");
    this.dataSaved = false;  
    const company = this.companyForm.value;  
    this.register(company);  
    this.companyForm.reset();  
  }  



 register(stock_company: StockCompany) {  
    if (this.employeeIdUpdate == null) {  
      this.estockservices.AddCompany(stock_company).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.message = 'Record saved Successfully';  
         // this.loadAllEmployees();  
          this.employeeIdUpdate = null;  
          this.companyForm.reset();  
        }  
      );  
    } else {  
      // employee.EmpId = this.employeeIdUpdate;  
      // this.estockservices.updateEmployee(employee).subscribe(() => {  
      //   this.dataSaved = true;  
      //   this.message = 'Record Updated Successfully';  
      //   this.loadAllEmployees();  
      //   this.employeeIdUpdate = null;  
      //   this.CompanyForm.reset();  
      //});  
    }  
  }   
  resetForm() {  
    this.companyForm.reset();  
    this.message = "";  
    this.dataSaved = false;  
  }  

}
