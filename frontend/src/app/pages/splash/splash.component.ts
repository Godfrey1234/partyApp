import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { Interface } from 'src/app/interface/interface';
import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Options, LabelType } from 'ng5-slider';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
 




  constructor(private jwt:JwtService, private service:PartyTainersService,private toast:NgToastService, private http: HttpClient) { }

  ngOnInit(): void {

 
    

      

     

  }


  onClick(){

   
   

  }



  
 


  

}
