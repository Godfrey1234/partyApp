import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from 'src/app/services/profile.service';
import { JwtService } from 'src/app/services/jwt.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-provider-profile',
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.scss']
})
export class ProviderProfileComponent implements OnInit {

  descForm: FormGroup = new FormGroup ({

    description: new FormControl(''),

  })



  EditProfileForm: FormGroup = new FormGroup ({
    
    user_name: new FormControl(''),
    user_lastname: new FormControl(''),
    service: new FormControl(''),
    description: new FormControl(''),
    ratings: new FormControl(''),
    profilepic: new FormControl(''),
    province: new FormControl(''),
    city: new FormControl(''),
    area: new FormControl(''),
    street  : new FormControl(''),
    coverimg: new FormControl(''),
    image: new FormControl(''),
    status:new FormControl(''),
  })


  GallaryForm: FormGroup = new FormGroup ({

    file2:new FormControl(''),
  })

  
public users!: any;
submitted = false;

//declare variables

name:any;
surname:any;
descriptions:any;
services:any;
profilepics:any;
ratings:any;
area: any;
id:any;
email:any;
post: any;
isVisible: any;
user: any;
coverimg:any;
file:any;
file1:any;
file2:any;
profilepic: any;
cities:any;
coverimage:any;
citttt:any;
provinces:any;
street: any;
content:any[] = [''];
desc:any;





constructor( private http :HttpClient, private profileService: ProfileService, private toast: NgToastService, public fb: FormBuilder, private jwt:JwtService,private router:Router ) { }

Province: any= ['Gauteng','Mpumalanga']
gCity : any= ['Johannesburg', 'Pretoria','Soweto']
MCity : any= ['mbombela','eNtokozweni'] 

onSelectP(){
  if(this.EditProfileForm.value.province === "Gauteng"){

    this.citttt = this.gCity
 
   }else if(this.EditProfileForm.value.province === "Mpumalanga"){
    this.citttt = this.MCity
  
   }
}
    ngOnInit(): void {

    //this.getContent();

    this.getLoggedinUserDetails();
    this.details();

 
}



details(){

  this.profileService.GetAllUsers(this.id).subscribe((res:any) => {
     
    console.log(res, "data");
    
    let result = res;
    this.users = result;
    this.email = res[0].user_email
    this.name = res[0].user_name;
    this.surname = res[0].user_lastname;

    this.desc = res[0].description;
    this.ratings  = res[0].rating;
    this.services = res[0].service;
    this.cities=res[0].city;
    this.area=res[0].area;
    this.street = res[0].street;

    this.descriptions=res[0].description;
    this.coverimage=res[0].coverimg;
    this.provinces=res[0].province;
    this.profilepic = res[0].profilepic;
    this.coverimg = res[0].coverimg;
    
})

}

  getLoggedinUserDetails(){
    const {user_id} = this.jwt.getData(sessionStorage.getItem('token'));  
    this.id = user_id;  

    console.log(this.id , "id")


    this.profileService.getContent(this.id).subscribe(
      (data:any)=>{

      console.log('this ',data)
      this.content = data;
      this.router.navigate(['/pprofile']);
      

    } ,(error:any)=>{
      console.log(error.error);
      
    })

  }

updateDescription()
{

  console.log(this.descForm.value);


    this.profileService.descUpdate(this.id, this.descForm.value).subscribe((res:any)=> {
      console.log(res);
      this.desc = this.descForm.value.desc;
      this.toast.success({detail:'Success',summary:'you have successfully updated your bio!', duration:1500,position:'tr'})
      

      this.details();
    })
}
   
  getContent(){
      
    this.getLoggedinUserDetails()
    this.profileService.getContent(this.id).subscribe((data:any)=>{

      console.log(data)
      this.content = data;
     

    })
  }

      //targetting the selected image
      onFileChange(event:any) {

        if (event.target.files.length > 0) {
          this.file1 = event.target.files[0];


             
        const formData = new FormData();
        formData.append("file",this.file1)
        formData.append("upload_preset","chsurqx3")

        this.http.post('https://api.cloudinary.com/v1_1/dp94yvsaw/image/upload',formData, )
        .subscribe((res:any)=>{

          this.profilepic = res.url;

          //updateClientProfilepic

          this.EditProfileForm.value.profilepic = res.url;
          this.http.put('http://localhost:3000/updateClientProfilepic/'+this.id,this.EditProfileForm.value, )
          .subscribe((res:any)=>{

          
            this.toast.success({detail:'Success',summary:'profile picture successfully updated!', duration:1500,position:'tr'})


          })


        })


          
        }
    } 


            //targetting the selected image
onFileChangeCover(event:any) {

  if (event.target.files.length > 0) {

  this.file = event.target.files[0];


       
  const formData = new FormData();
  formData.append("file",this.file)
  formData.append("upload_preset","chsurqx3")

  this.http.post('https://api.cloudinary.com/v1_1/dp94yvsaw/image/upload',formData, )
  .subscribe((res:any)=>{

    this.coverimg = res.url;

    //updatecoverimg

    this.EditProfileForm.value.coverimg = res.url;
    this.http.put('http://localhost:3000/updateCoverImg/'+this.id,this.EditProfileForm.value, )
    .subscribe((res:any)=>{

    
      this.openSuccess();

    })


  })


    
  }
}

onFileAddImg(event:any){



  if (event.target.files.length > 0) {

    this.file2 = event.target.files[0];
      
    }
}

gallaryUpload()
{
  const formData = new FormData();
        formData.append("file",this.file2)
        formData.append("upload_preset","chsurqx3")

        this.http.post('https://api.cloudinary.com/v1_1/dp94yvsaw/image/upload',formData, )
        .subscribe((res:any)=>{

        

          this.EditProfileForm.value.image = res.url;

          this.profileService.AddContent(this.id,this.EditProfileForm.value).subscribe((res:any)=>{

            console.log(res + 'kkk')
            if(res = 'success'){
            
              this.toast.success({detail:'Success',summary:'Image posted on Gallery!', duration:1500,position:'tr'})
              this.getContent()
            }
           

          })
        


        })
}





        
  UpdateUser()
  {
    // let id=localStorage.getItem('user_id');
    // console.log(id)
      this.submitted = true;

      if(this.EditProfileForm.value.area != '' && this.EditProfileForm.value.street != '' && this.EditProfileForm.value.city != '' && this.EditProfileForm.value.province != '')
      {
        


        this.profileService.updateProviderProfile(this.id, this.EditProfileForm.value).subscribe((next:any) => {
          this.openSuccess();

          console.log(this.EditProfileForm.value)

          console.log(next)

          this.profileService.GetAllUsers(this.id).subscribe((res:any) => {
            let result = res;
            this.users = result;
            this.name = res[0].user_name;
            this.surname = res[0].user_lastname;
            this.provinces=res[0].province;
            this.cities=res[0].city;
            this.area=res[0].area;
            this.descriptions=res[0].description;
            this.street=res[0].street



           
           this.router.navigate(['/pprofile']);
        })
      });
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
  this.toast.success({detail:'Success',summary:'Successfully updated!', duration:1500,position:'tr'})
}

preset:string = "djawlc825";

 update_dp = new FormGroup({
 file:new FormControl(),
 upload_preset: new FormControl()}
)


onDelete(id:any){

  console.log(id)
  this.EditProfileForm.value.status = "Deleted"  

  this.http.put('http://localhost:3000/deleteImage/'+id,this.EditProfileForm.value).subscribe((data:any)=>{



    if(data){
      this.getContent();
      this.toast.success({detail:'Success',summary:'image Successfully deleted!', duration:1500,position:'tr'})
    }

 
  

  })

}

 onClickCover(){


  const formData = new FormData();
  formData.append("file",this.id)
  formData.append("upload_preset","chsurqx3")

  this.http.post('https://api.cloudinary.com/v1_1/djawlc825/image/upload',formData,)
  .subscribe((res:any)=>{
      
  
  if(res.url){
   
   this.profilepics = res.url
   this.post.value.profilepic  = res.url
   this.post.value.id = this.users[0].id
   this.post.value.email = this.users[0].email
   this.post.value.area = this.users[0].area
   this.post.value.city = this.users[0].city
   console.log(this.post.value,"value")
   
   this.http.put('http://localhost:3000/updateProviderProfile/',this.post.value,{responseType:'text'} )
   .subscribe((res:any)=>{

    
     
     if(res){
       this.getDetails()
       this.isVisible=true;
       setTimeout(()=>this.isVisible=false,1000)
       
     }
     
   

   }) // end of sending data to backend
  }


  })// end of sending image to cloudinary


 }


  getDetails() {
    throw new Error('Method not implemented.');
  }

}

