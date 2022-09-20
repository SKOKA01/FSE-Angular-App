import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';  
import { Observable } from 'rxjs';  
import { EstockservicesService } from '../../services/estockservices.service';  
import { StockCompany } from '../../class/stock-company';  
import { StockPrice } from 'src/app/class/stock-price';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stocks-work',
  templateUrl: './stocks-work.component.html',
  styleUrls: ['./stocks-work.component.css'],
  providers: [DatePipe]
})
export class StocksWorkComponent implements OnInit {

  
  public dateTime: Date = new Date();
  allStocks :  Observable<StockPrice[]>
  StockForm : any;
  searchcode : number = 0;
  public searchcompany : string = '';
  searchfromdate : NgbDateStruct = {
    "year": 2022,
    "month": 2,
    "day": 1
  } ;
  latest_start_date : string | null = '';
  latest_end_date : string | null = '';



 startdate = new Date (this.searchfromdate.year, this.searchfromdate.month-1,this.searchfromdate.day);
  searchtodate : NgbDateStruct = {
    "year": 2022,
    "month": 2,
    "day": 1
  } ;
  enddate = new Date (this.searchtodate.year, this.searchtodate.month-1,this.searchtodate.day);
  company : StockCompany = {
    stock_CompanyId: 0,
    companyCode: 0,
    companyName: '',
    companyCEO: '',
    companyWebsite: '',
    companyTurnOver: 0,
    stockExchange: '',
    updatedBy: '',
    status: ''
  }
  
  stock_price_details :StockPrice = {
    stock_Price_ID: 0,
    company_Code: 0,
    company_Name: '',
    stock_Price: 0,
    updated_On: new Date(),
    Updated_By: ''
  }
   stock_price = new Map<number, number>();
   myDate = new Date();

   constructor(private datePipe: DatePipe, private formbulider: UntypedFormBuilder,private estockservices:EstockservicesService) {
   this.allStocks = this.estockservices.getAllstocks();   
   }
  ngOnInit(): void {
    console.log(this.allStocks);
    this.StockForm = this.formbulider.group({  
      company_Code : ['', [Validators.required]],
      company_Name: ['', [Validators.required]],
      stock_Price: ['', [Validators.required]],
      updated_On: ''
    });  
  }
  onFormSubmit(companyForm : Observable<StockCompany[]> ) {  
    // console.log("entered ng submit");
     
     const stock = this.StockForm.value;  
     this.addstocks(stock);  
     this.StockForm.reset();  
   }  
   addstocks(stock: StockPrice) {
     stock.updated_On = this.myDate;
     stock.Updated_By="Skoka01"
     stock.stock_Price_ID=0;
      console.log(stock)
      this.estockservices.addStocks(stock).subscribe(  
        () => {  
          //this.dataSaved = true;  
          //this.message = 'Record saved Successfully';  
         // this.loadAllEmployees();            
          this.StockForm.reset();
          this.allStocks = this.estockservices.getAllstocks();  
        }  
      );      
  }   
  getCompanybyCode()
  {
    console.log("entered getcompanybycode" + this.searchcode + "dates" + this.searchfromdate + "," + this.searchtodate)
    //this.searchcompany = 'google';
    //this.company =  this.estockservices.getCompanybyCode(this.searchText);
    // this.estockservices.getStockPriceByCompanyCode(this.searchcode).subscribe(
    //   data => this.allStocks = data )
    if (this.searchcode  == 0)
    {        
      this.allStocks = this.estockservices.getAllstocks();
    }else{
      this.startdate = new Date (this.searchfromdate.year, this.searchfromdate.month-1,this.searchfromdate.day);
      this.latest_start_date = this.datePipe.transform(this.startdate, 'yyyy/MM/dd')
      this.enddate = new Date (this.searchtodate.year, this.searchtodate.month-1,this.searchtodate.day);
      this.latest_end_date = this.datePipe.transform(this.enddate, 'yyyy/MM/dd')
      console.log(this.latest_start_date);
      console.log(this.latest_end_date)
      this.allStocks = this.estockservices.getStockPriceByCompanyCode(this.searchcode, this.latest_start_date,this.latest_end_date);
      this.searchcode = 0;
    }
    // this.allStocks = this.stock_price_details     
    console.log(this.stock_price_details)
   // this.getStockPriceByCompanyCode(this.company.companyCode);
    
  }
  getStockPriceByCompanyCode(CompanyCode : number){
    //this.stock_price_details =  this.estockservices.getStockPriceByCompanyCode(CompanyCode);
    // this.estockservices.getStockPriceByCompanyCode(CompanyCode).subscribe(
    //   data => this.allStocks = data )
     this.stock_price.set(CompanyCode, this.stock_price_details.stock_Price) ;
    //  console.log(this.stock_price_details)
    //  console.log(this.stock_price_details.stock_Price)
    return this.stock_price_details.stock_Price;
  }

}
