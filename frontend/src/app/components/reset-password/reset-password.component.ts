import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JwtService } from 'src/app/services/jwt.service';
import { UpdateProfileService } from 'src/app/services/update-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private http: HttpClient,private jwt:JwtService,private activatedRoute: ActivatedRoute, private respas:UpdateProfileService,private router:Router, private toast:NgToastService) { }
  reset_token: any | undefined;
  ngOnInit(): void {
    //this.reset_token = this.activatedRoute.snapshot.paramMap.get('reset_token');
    this.activatedRoute.params.forEach((params: Params) => {
      this.reset_token = params['reset_token'];
      localStorage.setItem('reset_token', this.reset_token);
      console.log('This Reset Token '+this.reset_token);
    });
   
  }

  passwordForm = new FormGroup({
    confirmPassword :new FormControl(''),
    password :new FormControl('')  
  });


  
  onSubmit(){
//data = this.passwordForm.value.password;
if(this.passwordForm.valid){
if(this.passwordForm.value.password  == this.passwordForm.value.confirmPassword)
{
    console.log(this.passwordForm.value.password);
    this.respas.resetPassword(this.reset_token,this.passwordForm.value).subscribe((data: any)=> {
      //console.log(res);
  
      if(data==='Password reset sucessful')
      {
        this.toast.success({detail:'Success',summary:'Password Updated ',duration:3000,position: 'tr'});
        //123456
        this.router.navigateByUrl('/login');
      }
      // else if(data==='Invalid or expired token'){
      //   this.toast.warning({detail:'Error',summary:'Invalid or expired token'+'!',duration:3000,position: 'tr'});
      
      // }
      else{
        this.toast.warning({detail:'Error encountered',summary:'Try again or link expired'+'!',duration:3000,position: 'tr'});
      }
    },(error:HttpErrorResponse)=>{
      this.toast.warning({detail:'Error',summary:'Invalid or expired token'+'!',duration:4000,position: 'tr'});
    })
     

}
  else
       {
      this.toast.warning({detail:'Error',summary:'passwords do not match '+'!',duration:3000,position: 'tr'});
      
       }
}
  }


}
