import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtService } from 'src/app/services/jwt.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { NgToastService } from 'ng-angular-popup';
import { NgxSmartLoaderService, NgxSmartLoaderModule } from 'ngx-smart-loader';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  stars = [1,  2,  3,  4,  5];
  //  stars = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  ratings:any;
  ratingText:any;
  











  //count = 0;

  services:any;

  provider = {
    prov_id: 0,
    name: '',
    surname: '',
    description:'',
    image: '',
    email:'',
    ratings_counter:'' ,
    rating: 0.0,
  }
  constructor(private router: Router, private service:PartyTainersService,private jwt : JwtService,private http: HttpClient,private toast: NgToastService,public loader: NgxSmartLoaderService) { }

  ngOnInit(): void {

   
    





    //this.getRating();
  
   //this.showLoader();
   this.loader.start('myLoader');
    this.service.getOneUserProfile(sessionStorage.getItem('prov_id')).subscribe(async(data:any)=>{

     // this.developer.image = await data.image;
      this.provider.name = await data.user_name;
      this.provider.surname = await data.user_lastname;
      this.provider.description = await data.description;
      this.provider.email = await data.user_email;
      this.provider.image = await data.coverimg;
      this.provider.rating = await data.rating;
      this.provider.ratings_counter = await data.ratings_counter ;
      this.provider.prov_id = await data.user_id;
      this.services = await data.service

 

      console.log(data)
      this.loader.stop('myLoader');
    },(err: HttpErrorResponse)=>{
      //this.toast.error({detail:'Error', summary:(err.error.message)});
    })
  }

   showLoader() {
   this.loader.start('myLoader');
    setTimeout(() => {
       this.loader.stop('myLoader');
     }, 1000);
   }

  onClick(ratings: number) {
    this.ratings = ratings;


    if(this.ratings === 1){

      this.ratingText = " 😖 Yuck"
         
    }else if(this.ratings === 2 ){

      this.ratingText = "😕 Meh"
    }else if(this.ratings === 3 ){

      this.ratingText = "😀 Good"
    }else if(this.ratings === 4 ){

      this.ratingText = "🤩 Excellent"
    }else if(this.ratings === 5 ){

      this.ratingText = "🥳 Awesome"
    }








    //this.changeRating(ratings);
  }

  // getRating() {
  //   this.http.get('http://localhost:3000/rating').subscribe(data => {
  //     //this.rating = data['rating'];
  //    // this.count = data['count'];
  //   });
  // }
  data ={
    rating: 0.0,
    prov_id : 0
  }
  changeRating(){


    this.data.rating = this.ratings;
    this.data.prov_id = this.provider.prov_id
    console.log(this.data);

    this.service.rating(this.data).subscribe((result:any) =>{
      //this.toast.success({detail:'Successful', summary:(result.message)});
      this.toast.success({detail:'Success',summary:'Successfully rated the provider',duration:3000,position: 'tr'});
      this.router.navigateByUrl('/clientbookings');

    },(err:HttpErrorResponse)=>{
      // console.log(err)
      //this.toast.error({detail:'Error', summary:(err.error.message)});
      this.toast.warning({detail:'Error',summary:'Please try again'+'!',duration:3000,position: 'tr'});
    })
  }

  // private subscriptions : Subscription[] = [];
  //   ratingForm = new FormGroup({

  //   rate: new FormControl()

  // });




}
