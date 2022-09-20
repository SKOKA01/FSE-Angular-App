import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockCompany } from '../class/stock-company';
import { StockPrice } from '../class/stock-price';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class EstockservicesService {

  url = 'https://localhost:44331/api/v1.0/market/company';  
  constructor(private http: HttpClient) { }  
  
  //api call to get all companies list
  getAllCompanies() : Observable<StockCompany[]> {      
    
    return this.http.get<StockCompany[]>(this.url + "/getall");  
  }  
  //api call to add company to list
  AddCompany(StockCompany: StockCompany): Observable<StockCompany> {  
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(StockCompany);
    console.log(body)
    // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };    
    return this.http.post<StockCompany>(this.url + '/register', body,{'headers':headers})
    // return this.http.post<StockCompany>(this.url + '/register',  
    // StockCompany, httpOptions);  
  }  



 getCompanybyCode(code : number):  Observable<StockCompany>{
   // console.log("entered api");
   // console.log(this.url + "/info/0?code=" + code)
    return this.http.get<StockCompany>(this.url + "/info/0?code=" + code);
  }
  deleteCompanybyCode(code : number):  Observable<StockCompany>{
    // console.log("entered api");
    // console.log(this.url + "/info/0?code=" + code)
     return this.http.delete<StockCompany>(this.url + "/delete/0?code=" + code);
   }
  getStockPriceByCompanyCode (code : number, startdate : string | null , enddate : string | null):  Observable<StockPrice[]>
  {
    //console.log("https://localhost:44331/api/StockPriceList/api/StockPriceList/0?code="+ code +"&startdate="+startdate+"&enddate="+ enddate)
    //return this.http.get<StockPrice[]>(this.url + "/stockprice/0?code=" + code);
   return this.http.get<StockPrice[]>("https://localhost:44331/api/v1.0/market/company/stockprice/code="+ code +"/"+startdate+"/"+ enddate)
  }
  getAllstocks():  Observable<StockPrice[]>
  {
    console.log(this.http.get<StockPrice[]>(this.url + "/getallstocks"))
    return this.http.get<StockPrice[]>(this.url + "/getallstocks");  
  }
// constructor() { }
  addStocks(stocks: StockPrice): Observable<StockPrice> {  
  const headers = { 'content-type': 'application/json'}  
  const body=JSON.stringify(stocks);
  console.log(body)
  // const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };   
  return this.http.post<StockPrice>('https://localhost:44331/api/v1.0/market/stock/add', body,{'headers':headers})
}  
deleteStocksbyCode(code : number):  Observable<StockPrice>{
   return this.http.delete<StockPrice>('https://localhost:44331/api/v1.0/market/stock/delete/0?code=' + code);
}
getCurrentStockPrice(code : number):  Observable<StockPrice>
{
  console.log(this.http.get<StockPrice>('https://localhost:44331/api/v1.0/market/company/stockprice/' + code));
  ///api/v1.0/market/company/stockprice/{code}/{startdate}/{enddate}
  return this.http.get<StockPrice>('https://localhost:44331/api/v1.0/market/company/stockprice/' + code);
}
}
