import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from 'src/app/services/jwt.service';
import { Subscription } from 'rxjs';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-registerprovider',
  templateUrl: './registerprovider.component.html',
  styleUrls: ['./registerprovider.component.scss']
})
export class RegisterproviderComponent implements OnInit {
  message ='`hello world';

  constructor(private router: Router, private service:PartyTainersService,private jwt : JwtService,private toast:NgToastService, private http: HttpClient ) { }

  readioSelected:any;
  showcontent:boolean=false;

 showContent(){
   this.showcontent=this.readioSelected;
 }

 valuee = 0;
 value = 0;

  ngOnInit(): void {
  }

provinces : any= ['Gauteng','Mpumalanga','KwaZulu-Natal','Free State','Western Cape','North West','Northen Cape','Limpopo','Eastern Cape']
sevices: any=['Entertainment', 'Caterer', 'Venue', 'Decorations']

  selectedOption: string | undefined;
  preset :any;

  private subscriptions : Subscription[] = [];
    registerForm = new FormGroup({
    user_name: new FormControl('',[Validators.minLength(2),Validators.maxLength(20) ,Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    user_lastname: new FormControl('',[Validators.minLength(2),Validators.maxLength(20) ,Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    user_email: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl(),
    province: new FormControl(),
    city: new FormControl(),
    area: new FormControl(),
    street: new FormControl(),
    service: new FormControl(),
    description: new FormControl(),
    file: new FormControl(),
    coverimg: new FormControl(),
  });

 
file: any;
//targetting the selected image
onFileChange(event:any) {

  if (event.target.files.length > 0) {
    this.file = event.target.files[0];

  }
}





  onRegister(form : FormGroup)
  {
    form.value.coverimg = form.value.file;

    console.log(this.registerForm.value)

    // registerForm = new FormGroup({
    //   user_name: new FormControl('',[Validators.minLength(2),Validators.maxLength(20) ,Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    //   user_lastname: new FormControl('',[Validators.minLength(2),Validators.maxLength(20) ,Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
    //   user_email: new FormControl(),
    //   password: new FormControl(),
    //   confirmPassword: new FormControl(),
    //   province: new FormControl(),
    //   city: new FormControl(),
    //   area: new FormControl(),
    //   street: new FormControl(),
    //   service: new FormControl(),
    //   description: new FormControl(),
    //   file: new FormControl(),
    //   coverimg: new FormControl(),

    if(this.registerForm.value.user_name != '' && this.registerForm.value.user_lastname != '' && this.registerForm.value.user_email != '' && this.registerForm.value.password != '' && this.registerForm.value.confirmPassword != '' && this.registerForm.value.province != '' && this.registerForm.value.city != '' && this.registerForm.value.area != '' && this.registerForm.value.street != '' && this.registerForm.value.service != '' && this.registerForm.value.file != '' && this.registerForm.value.coverimg != ''){
    if(form.valid)
    {
      
       
      if(form.value.password  == form.value.confirmPassword)
    {

      const formData = new FormData();
      formData.append("file",this.file)
      formData.append("upload_preset","chsurqx3")
   
      this.http.post('https://api.cloudinary.com/v1_1/dp94yvsaw/image/upload',formData, )
      .subscribe((res:any)=>{

      if(res.url){
        this.registerForm.value.coverimg = res.url;
        //this.toast.success({detail:'Success',summary:'Successfuly uploaded ',duration:3000,position: 'tr'});
        console.log(this.registerForm.value.coverimg);
       
      
     
        //this.subscriptions.push(
          console.log(this.registerForm.value);
          this.service.regprovider(this.registerForm.value).subscribe((response:any)=>{

                
         


            this.service.login(form.value).subscribe((data: any)=>{
            this.service.saveToken(data.token);

              console.log(response)
              if(response === 'User successfully registered'){
              
              const {user_email,user_name,last_name,account, user_id, coverimg} = this.jwt.getData(data.token);
              sessionStorage.setItem('user_email',user_email);
              localStorage.setItem('account', account);
              sessionStorage.setItem('last_name',last_name);
              sessionStorage.setItem('user_name',user_name);
              sessionStorage.setItem('user_id',user_id);
              sessionStorage.setItem('coverimg',coverimg);

              // setTimeout(() => {
              //   this.message = 'Logging you in...'
              // },2000);
              // setTimeout(() => {
              //   this.message = 'Welcome to Party-tainers'
              // }, 3000);
              // setTimeout(() => {
              //   this.router.navigateByUrl('/planding');
              // }, 5000);
              this.router.navigateByUrl('/planding');
            }else{
              this.toast.warning({detail:'Warning',summary:'User already exists, Please login!', sticky:true,position:'tr'})

            }
            })
            
            //else{this.toast.warning({detail:'Error',summary:'Upload failed '+'!',duration:3000,position: 'tr'});}
          
            //this.router.navigateByUrl('/planding');
            this.toast.success({detail:'Welcome',summary:'Welcome to Party-Tainer '+form.value.user_name+'!',duration:3000,position: 'tr'});
          },(error:HttpErrorResponse)=>{
           // this.toastr.error(JSON.stringify(error.error.message))
            this.toast.warning({detail:'Warning',summary:'User already exists, Please login!', sticky:true,position:'tr'})

          })
       }else
       {
        this.toast.warning({detail:'Error',summary:'password dont match'+'!',duration:3000,position: 'tr'});
     
    }
  })
       }
       
       
    }
    }else{
      this.toast.warning({detail:'Warning',summary:'Please fill in all the fields...!', duration:1500,position:'tr'})

    }
  }



}
