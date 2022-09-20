import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockCompany } from 'src/app/class/stock-company';
import { StockPrice } from 'src/app/class/stock-price';
import { EstockservicesService } from 'src/app/services/estockservices.service';

@Component({
  selector: 'app-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.css']
})
export class StockDisplayComponent implements OnInit {

  allCompanies: Observable<StockCompany[]> = this.estockservices.getAllCompanies();
  //allStocks: StockPrice[] = this.estockservices.getAllstocks();
  minimum : number = 0;
  maximum : number = 0;
  average : number = 0;
  stock_price_details :StockPrice = {
    stock_Price_ID: 0,
    company_Code: 0,
    company_Name: '',
    stock_Price: 0,
    updated_On: new Date(),
    Updated_By: ''
  }
   stock_price = new Map<number, number>();
  //stock_price : number = 0;
  constructor(private estockservices:EstockservicesService) {   
    this.allCompanies = this.estockservices.getAllCompanies();
   // this.getStockPriceByCompanyCode(1001)  
   }



allcompany:any[] = [];

  // [{"stock_CompanyId":2,"companyCode":1001,"companyName":"Google","companyCEO":"SundarPichai","companyTurnOver":200000,"companyWebsite":"www.google.com","stockExchange":1,"updatedBy":"Venkatesh","update_TS":"2022-04-07T14:59:59.822","status":"active"},
  //                     {"stock_CompanyId":3,"companyCode":1002,"companyName":"Cignizant","companyCEO":"Brian","companyTurnOver":200000,"companyWebsite":"www.cognizant.com","stockExchange":1300,"updatedBy":"venkatesh","update_TS":"2022-04-08T10:19:33.227","status":"active"}];
  index : number = 0;
  ngOnInit(): void {
    this.loadAllEmployees();



   // this.estockservices.getAllCompanies().subscribe(
    //   data => this.allcompany = data
    //)
  }



//  setStockPricetoCompany()
//  {
//   for (let company of this.allCompanies)
//   {
//     this.stock_price.set(this.allCompanies, this.stock_price_details.stock_Price) ;
//   }
//  }



 getStockPrice(Company : StockCompany){
    let allStocks : StockPrice[];
    //this.stock_price_details =  this.estockservices.getStockPriceByCompanyCode(Company.companyCode,null,null);
      this.estockservices.getStockPriceByCompanyCode(Company.companyCode,null,null).subscribe(
        data => allStocks = data,
        //this.stock_price.set(Company.companyCode, data.stock_Price)
        )
    
     console.log(this.stock_price_details)
    // console.log(this.stock_price_details.stock_Price)
    return this.stock_price_details.stock_Price;
  }



 getStockPriceByCompanyCode(CompanyCode : number){
    //this.stock_price_details =  this.estockservices.getStockPriceByCompanyCode(CompanyCode,null,null);
    // this.estockservices.getStockPriceByCompanyCode(CompanyCode).subscribe(
    //   data => this.stock_price_details = data )
     this.stock_price.set(CompanyCode, this.stock_price_details.stock_Price) ;
     console.log(this.stock_price_details)
    // console.log(this.stock_price_details.stock_Price)
    return this.stock_price_details.stock_Price;
  }
  loadAllEmployees() {  
    this.allCompanies = this.estockservices.getAllCompanies();  
   // minimum =
  
  }  
  deleteCompanyByCode(companyCode : number)
  {
    this.estockservices.deleteCompanybyCode(companyCode).subscribe();
    this.estockservices.deleteStocksbyCode(companyCode).subscribe();
    this.allCompanies = this.estockservices.getAllCompanies();
     //this.stock_price.set(companyCode, this.stock_price_details.stock_Price) ;
  }

}
