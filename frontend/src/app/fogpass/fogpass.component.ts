import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form,FormGroupName } from '@angular/forms';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { NgToastService } from 'ng-angular-popup';
import { UpdateProfileService } from '../services/update-profile.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fogpass',
  templateUrl: './fogpass.component.html',
  styleUrls: ['./fogpass.component.scss']
})
export class FogpassComponent implements OnInit {

  constructor(private toast:NgToastService, private forgpass:UpdateProfileService, private router:Router) { }

  ngOnInit(): void {
  }

  forgotpass = new FormGroup({
    user_email :new FormControl(''), 
  });

// onSubmit(data:any){
//   console.log(this.forgotpass.value);
// };

onSubmit(){


let email = this.forgotpass.value;
  console.log(this.forgotpass.value.user_email);

  this.forgpass.forgotPassword(this.forgotpass.value).subscribe((result:any) =>{
   // this.toast.success({detail:'Successful', summary:(result.message)});
    this.toast.success({detail:'Success',summary:'Password sent to your email!',duration:3000,position: 'tr'});
    this.router.navigateByUrl('/login');

  },(err:HttpErrorResponse)=>{
    // console.log(err)
    //this.toast.error({detail:'Error', summary:(err.error.message)});
    this.toast.warning({detail:'Error',summary:'Invalid email'+'!',duration:3000,position: 'tr'});
  })
}

}
