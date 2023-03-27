import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from 'src/app/services/profile.service';
import { JwtService } from 'src/app/services/jwt.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

 
  EditProfileForm: FormGroup = new FormGroup({
    user_name: new FormControl(),
    user_lastname: new FormControl(),
    user_email: new FormControl(),
    profilepic : new FormControl(),
  });

  

  public users!: any;
  submitted = false;
  user_id :any

  //declare variables

  name:any;
  surname:any;
  email:any;
  file:any;
  profilepic:any;

  constructor(private http:HttpClient,private profileService: ProfileService, private toast: NgToastService, public fb: FormBuilder, private jwt:JwtService, private router:Router) { }

  myForm() {
    this.EditProfileForm = this.fb.group({
      user_name: ['', [ Validators.required ]],
      user_lastname: ['', [ Validators.required ]],
      user_email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.user_id = this.jwt.getData(sessionStorage.getItem('token')).user_id;

    this.getLoggedinUserDetails();
    this.myForm();

    this.profileService.GetAllUsers(this.id).subscribe((res:any) => {
      let result = res;
      this.users = result;

      console.log(res);

      this.name = res[0].user_name;
      this.surname = res[0].user_lastname;
      this.email = res[0].user_email;
      this.profilepic = res[0].profilepic;
      
  })
  }
 id:any;

  getLoggedinUserDetails(){
     
    this.id = this.user_id;  
    this.profileService.getUser(this.user_id).subscribe((res:any)=>{

    });
  }


   //targetting the selected image
      onFileChange(event:any) {

        if (event.target.files.length > 0) {
          this.file = event.target.files[0];


             
        const formData = new FormData();
        formData.append("file",this.file)
        formData.append("upload_preset","chsurqx3")

        this.http.post('https://api.cloudinary.com/v1_1/dp94yvsaw/image/upload',formData, )
        .subscribe((res:any)=>{

          this.profilepic = res.url;

          //updateClientProfilepic

          this.EditProfileForm.value.profilepic = res.url;
          this.http.put('https://party-app-rho.vercel.app/updateClientProfilepic/'+this.id,this.EditProfileForm.value, )
          .subscribe((res:any)=>{

            console.log('yes wena ma b');
            this.openSuccess();

          })


        })


          
        }
    }

  get formValidation(): { [key: string]: AbstractControl } {
    return this.EditProfileForm.controls;
  }

  UpdateUser()
  {
    // let id=localStorage.getItem('user_id');
    // console.log(id)
      this.submitted = true;

      if(this.EditProfileForm.value.user_name != '' && this.EditProfileForm.value.user_lastname != '' )
      {
        let userDetails = {
          user_name:this.EditProfileForm.value.user_name,
          user_lastname: this.EditProfileForm.value.user_lastname,
          user_email: this.EditProfileForm.value.user_email
        }
    
        console.log(userDetails);


        this.profileService.updateProfile(this.id, userDetails).subscribe((next:any) => {
          //this.router.navigate(['profile'])
          this.openSuccess();

          
          this.profileService.GetAllUsers(this.id).subscribe((res:any) => {
            let result = res;
            this.users = result;
      
            this.name = res[0].user_name;
            this.surname = res[0].user_lastname;
            this.email = res[0].user_email;
        })  
        });
        //this.router.navigate(['landing'])
    }
    else
    {
      //console.log('Successfully Updated!');
      this.openWarning();
    }
 
}

openWarning(){
  this.toast.warning({detail:'Warning',summary:'Please fill in all the fields...!', sticky:true,position:'tr'})
}
openSuccess(){
  this.toast.success({detail:'Success',summary:'Successfully updated!', sticky:true,position:'tr'})
}

}