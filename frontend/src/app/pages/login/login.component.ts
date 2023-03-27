import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { JwtService } from 'src/app/services/jwt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isVisible: boolean = false;
  provinces : any= ['Gauteng','Mpumalanga','KwaZulu-Natal','Free State','Western Cape','North West','Northen Cape','Limpopo','Eastern Cape']
sevices: any=['Entertainment', 'Caterer', 'Venue', 'Decorations']

    //declaring form group
   loginForm = new FormGroup({
      
    user_email :new FormControl(''),
    password :new FormControl('')
     
    
  });

  constructor(private jwt:JwtService, private service:PartyTainersService,private router:Router, private toast:NgToastService) { }

  ngOnInit(): void {
  }


  onSubmit(data:any){

 
    console.log(this.loginForm.value)


    this.service.login(this.loginForm.value).subscribe((response:any)=>{
  
      sessionStorage.setItem('token',response.token)

      const {user_email,user_name,user_lastname,account,user_id,rating} = this.jwt.getData(response.token);
      
      console.log(this.jwt.getData(data.token));
      sessionStorage.setItem('account', account);
      sessionStorage.setItem('user_email', user_email);
      sessionStorage.setItem('user_lastname',user_lastname);
      sessionStorage.setItem('user_name',user_name);
      sessionStorage.setItem('user_id',user_id); 
      sessionStorage.setItem('service','service');
      sessionStorage.setItem('profilepic','profilepic');
      sessionStorage.setItem('country','country');
      sessionStorage.setItem('province','province');
      sessionStorage.setItem('city','city');
      sessionStorage.setItem('area','area'); 
      sessionStorage.setItem('street','street'); 
      sessionStorage.setItem('service','service'); 
      sessionStorage.setItem('description','description'); 
      sessionStorage.setItem('rating',rating); 
      sessionStorage.setItem('coverimg','coverimg'); 
      sessionStorage.setItem('ratings_counter','ratings_counter'); 

  
      if( account =="client") //route to relevent page
      {
       
        console.log("loged in as client");
        
        this.router.navigate(['landing'])
        this.toast.success({detail:'Welcome',summary:'Welcome back '+user_name+'!',duration:3000,position: 'tr'});
       
      }
      else if( account =="provider") //route to relevent page
      {
      
        console.log("loged in as provider");
        
        this.router.navigate(['planding'])
        this.toast.success({detail:'Welcome',summary:'Welcome back '+user_name+'!',duration:3000,position: 'tr'});
      } 
    
     
    },(error:HttpErrorResponse)=>{
      this.toast.warning({detail:'Error',summary:'Invalid login credentials '+'!',duration:3000,position: 'tr'});
      console.log('invalid login details')
    })

  }


}
