import { Component, OnInit } from '@angular/core';
import { StockCompany } from 'src/app/class/stock-company';
import { StockPrice } from 'src/app/class/stock-price';
import { EstockservicesService } from 'src/app/services/estockservices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  

  ngOnInit(): void {
  }
  CompanyName : string = "";
  searchText : number = 0;
  code : number = this.searchText ;
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
  currentStockPrice :number = 0;
  constructor(private estockservices:EstockservicesService) {
    



 }




 getCompanybyCode()
  {
    console.log("entered getcompanybycode" + this.searchText)
    
    //this.company =  this.estockservices.getCompanybyCode(this.searchText);
    this.estockservices.getCompanybyCode(this.searchText).subscribe(
      data => this.company = data )
    console.log(this.company)
    this.getCurrentStockPrice(this.company.companyCode)
    //this.getStockPriceByCompanyCode(this.company.companyCode);
    
  }



 getCurrentStockPrice(companycode : number)
  {
    this.estockservices.getCurrentStockPrice(companycode).subscribe(
      data => this.currentStockPrice = data.stock_Price)



     console.log("completed")
  }



 getStockPriceByCompanyCode(CompanyCode : number){
    //this.stock_price_details =  this.estockservices.getStockPriceByCompanyCode(CompanyCode);
    // this.estockservices.getStockPriceByCompanyCode(CompanyCode).subscribe(
    //   data => this.stock_price_details = data )
     this.stock_price.set(CompanyCode, this.stock_price_details.stock_Price) ;
    //  console.log(this.stock_price_details)
    //  console.log(this.stock_price_details.stock_Price)
    return this.stock_price_details.stock_Price;
  }

}
