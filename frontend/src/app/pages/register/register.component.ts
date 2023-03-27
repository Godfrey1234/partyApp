import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from 'src/app/services/jwt.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  readioSelected:any;
  showcontent:boolean=false;

 showContent(){
   this.showcontent=this.readioSelected;
 }

 valuee = 0;
 value = 0;
 message= 'Hang tight...'
  // selectedOption: string | undefined;

  constructor(private router: Router, private service:PartyTainersService,private jwt : JwtService, private toast:NgToastService) { }


  ngOnInit(): void {

  }



  deafult: string = "N/A";

  selectedOption: string | undefined;


  private subscriptions : Subscription[] = [];
    registerForm = new FormGroup({
    user_name: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    user_lastname: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    user_email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),

  });


  onRegister(form : FormGroup)
  {
    if(form.valid)
    {

      if(form.value.password  == form.value.confirmPassword)
    {



        //this.subscriptions.push(
          this.service.register(form.value).subscribe((response:any)=>{
            this.service.login(form.value).subscribe((data: any)=>{
              this.service.saveToken(data.token);

              const {user_email,user_name,last_name,account, user_id} = this.jwt.getData(data.token);
              sessionStorage.setItem('user_email',user_email);
              localStorage.setItem('account', account);
              sessionStorage.setItem('last_name',last_name);
              sessionStorage.setItem('user_name',user_name);
              sessionStorage.setItem('user_id',user_id);

              // setTimeout(() => {
              //   this.message = 'Logging you in...'
              // },2000);
              // setTimeout(() => {
              //   this.message = 'Welcome to Party-tainers'
              // }, 3000);
              // setTimeout(() => {
              //   this.router.navigateByUrl('/landing');
              // }, 5000);
              this.router.navigateByUrl('/landing');
            })
            //this.router.navigateByUrl('/landing');

            this.toast.success({detail:'Welcome',summary:'Welcome to Party-Tainer '+form.value.user_name+'!',duration:3000,position: 'tr'});
          },(error:HttpErrorResponse)=>{
            this.toast.error({detail:'Error',summary:'Http Error',duration:3000,position: 'tr'});
            //this.toast.error(JSON.stringify(error.error.message));
            console.log(error)
          })
        //)
       }else
       {
      this.toast.warning({detail:'Error',summary:'password dont match '+'!',duration:3000,position: 'tr'});
      console.log("error");
       }
    }
  }



}
