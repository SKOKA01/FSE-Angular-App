import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { RegisterComponent } from './Components/register/register.component';
import { StockDisplayComponent } from './Components/stock-display/stock-display.component';
import { StocksWorkComponent } from './Components/stocks-work/stocks-work.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EstockservicesService } from './services/estockservices.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StockDisplayComponent,
    RegisterComponent,
    StocksWorkComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    HttpClientModule, NgbModule,
    RouterModule.forRoot([
      {path: 'Header', component: HeaderComponent},
      {path: 'Register', component: RegisterComponent},
      {path: 'CompanyList', component: StockDisplayComponent},
      {path: 'StocksList', component: StocksWorkComponent},
      {path: '**', component: PagenotfoundComponent}
    ]),
    FontAwesomeModule,
  ],
  providers: [EstockservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
