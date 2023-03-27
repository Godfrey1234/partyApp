import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { JwtService } from 'src/app/services/jwt.service';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { Interface } from 'src/app/interface/interface';
import { Time } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { ProfileService } from 'src/app/services/profile.service';
import { gallery } from 'src/app/interface/interface';
import { Options, LabelType } from 'ng5-slider';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
   
  value = 0 ;
  initials : any;
  Posts!:any;
  Deco!:any;
  CDetails!:any;
  provinces : any= ['Gauteng','Mpumalanga']
  gCity : any= ['Johannesburg', 'Pretoria','Soweto']
  MCity : any= ['mbombela','eNtokozweni']
  numG : any= ['1-50', '50-150','150-350','350-500']
  providerProfile :any;
  citttt:any;
  venueDetails!: Interface[];
  items: any;
  Decor:any;
  gallery : gallery[] = [];

  currentValue: number = 0;



   //declaring form group
   multiForm = new FormGroup({
      
    partyType :new FormControl(''),
    Province :new FormControl(''),
    city :new FormControl(''),
    num_guests:new FormControl(''),
    date:new FormControl(''),
    time:new FormControl(''),
    venueAnswer:new FormControl(''),
    cateringAnswer:new FormControl(''),
    decoAnswer:new FormControl(''),
    selectedVenue:new FormControl(''),
    prov:new FormControl('')
    
  });

  


  getProviderform = new FormGroup({
      
    service:new FormControl(''),
    province :new FormControl(''),
    city :new FormControl(''),

   
    
  });



  // form group for making a booking to venue providers


  bookingVenueForm = new FormGroup({
      
  
    user_id1: new FormControl(), // logged in user id which is the client
    user_id2: new FormControl(''), // provider ID
    partyType : new FormControl(''),
    num_guests : new FormControl(),
    date : new FormControl(''),
    time :new FormControl(''),
    location :new FormControl(''),
    service_name : new FormControl(''),
   
    
  });

  // form group for making a booking to caters

  bookingCateringForm = new FormGroup({
      
  
    user_id1: new FormControl(), // logged in user id which is the client
    user_id2: new FormControl(''), // provider ID
    partyType : new FormControl(''),
    num_guests : new FormControl(),
    date : new FormControl(''),
    time :new FormControl(''),
    location :new FormControl(''),
    service_name : new FormControl(''),
   
    
  });


   // form group for making a booking to Deco providers

   bookingDecoForm = new FormGroup({
      
  
    user_id1: new FormControl(), // logged in user id which is the client
    user_id2: new FormControl(''), // provider ID
    partyType : new FormControl(''),
    num_guests : new FormControl(),
    date : new FormControl(''),
    time :new FormControl(''),
    location :new FormControl(''),
    service_name : new FormControl(''),
   
    
  });





   


  // declaring variables to display all booking details
  partyType : any;
  Location  : any;
  numGuests : any;
  Date :any;
  Time : any;
  venue : any;
  cater : any;
  venueAnswer : any;
  cateranswer : any;
  Decoanswer : any;
  loggedinUser_id : any;
  providerMessage:any;
  Message:any
  name:any;
  surname:any;
  provider_Available:any;

  searchText:any = '';
  searchText2:any = '';
  searchText3:any = '';

  content:any;


  minValue: number = 0;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 150,
    translate: (value: number,  label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '' + value;
         
        case LabelType.High:
          return '' + value;
     
        default:
          return '' + value;
      }
    }
  };
 

  backgroundimage = "https://images.unsplash.com/photo-1589050820342-d666e6116a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80";

  constructor(public loader: NgxSmartLoaderService,private jwt:JwtService, private service:PartyTainersService,private toast:NgToastService, private http: HttpClient, private profileservice:ProfileService) { }

  ngOnInit(): void {
  
 
   this.getLoggedinUserDetails()

       
 

     

  }

 



  onSelectP(){
    if(this.multiForm.value.Province === "Gauteng"){

      this.citttt = this.gCity
   
     }else if(this.multiForm.value.Province === "Mpumalanga"){
      this.citttt = this.MCity
    
     }
  }


  getLoggedinUserDetails(){
    const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(sessionStorage.getItem('token'));
     
    this.loggedinUser_id = user_id;
    this.name = user_name;
    this.surname = user_lastname;

  
    
  }

 
  
  // next funtion for required input fields
  onNext(){
   
  
  
  
    if(this.multiForm.value.Province === '' || this.multiForm.value.city === '' || this.multiForm.value.date === '' || this.multiForm.value.time === ''){

      this.toast.warning({detail:'Hi '+ this.name,summary:' Please fill all the Fields',duration:1500,position: 'tr'});
    
      

    }else if(this.maxValue === 0){
      this.toast.warning({detail:'Hi'+ this.name,summary:'Number of Guests Must be atleast more than 0',duration:1500,position: 'tr'});
  
    }else{
      this.value = this.value + 1
    }
    
    
  
  
   
  }



  onPrevV(){
    this.value = this.value - 1

  }

  onPrev(){

  
    if(this.multiForm.value.venueAnswer === "no"  ){
       this.value = this.value - 2
       this.venueAnswer = "no" 

     }else if(this.multiForm.value.cateringAnswer === "no" ){
      this.value = this.value - 2
      this.cateranswer = "no" 

     }else if(this.multiForm.value.decoAnswer === "no" ){
      this.value = this.value - 2
      this.Decoanswer = "no" 
     }
    else{
      this.value = this.value - 1
     }
     


   }  

   //************************************ */
  

    //next button for venue
  onNextV(){ 

    

      this.getProviderform.value.service = "Venue";
      this.getProviderform.value.city = this.multiForm.value.city;
      this.getProviderform.value.province = this.multiForm.value.Province 

      this.service.getProvider(this.getProviderform.value).subscribe((data)=>{

       this.provider_Available = data;
        console.log(data) 
       
        if(data == "we dont have service providers around your area"){
          console.log(data) 
          this.Message = "SORRY...! We do not have service providers around your area "+ this.multiForm.value.city + ".";
          this.providerMessage = "o";
          this.value = this.value + 1

         }else{
          this.Posts = data
          console.log(this.Posts)
         this.value = this.value + 1
         this.venueAnswer = "yes" 
        }
       
      })


      this.partyType = "Baby Shower";
      this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
      this.numGuests  = this.minValue +' - '+ this.maxValue ;
      this.Date = this.multiForm.value.date;
      this.Time = this.multiForm.value.time;


  }

 //next button for caters
  onNextC(){
    

    console.log('cater')
  
   
        this.value = this.value + 1
       
        this.getProviderform.value.service = "Cater";
        this.getProviderform.value.city = this.multiForm.value.city;
        this.getProviderform.value.province = this.multiForm.value.Province 
  
        this.service.getProvider(this.getProviderform.value).subscribe((data)=>{
  
          if(data == "we dont have service providers around your area"){
            console.log(data) 
            this.Message = "SORRY...! We do not have service providers around your area "+ this.multiForm.value.city + ".";
            this.providerMessage = "o";
  
           }else{
            console.log(data)
            this.CDetails = data
            this.cateranswer = "yes"
          }
  
  
        
        })
  
  
  
      
    
  
      this.partyType = "Baby Shower";
      this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
      this.numGuests  = this.minValue +' - '+ this.maxValue ;
      this.Date = this.multiForm.value.date;
      this.Time = this.multiForm.value.time;
  
  
  
  
    }

   //next button for DECO
   onNextD(){ 

  
    this.getProviderform.value.service = "Deco";
    this.getProviderform.value.city = this.multiForm.value.city;
    this.getProviderform.value.province = this.multiForm.value.Province 

    this.service.getProvider(this.getProviderform.value).subscribe((data)=>{

     console.log("ggvdagkhhcvbc:   ",data)
      if(data == "we dont have service providers around your area"){
        
        console.log(data) 
        this.Message = "SORRY...! We do not have service providers around your area "+ this.multiForm.value.city + ".";
        this.providerMessage = "o";



       }else{

        this.Deco = data
        console.log(this.Deco)
        this.value = this.value + 1
        this.Decoanswer = "yes" 

      }
     
    })

    this.partyType = "Baby Shower";
    this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
    this.numGuests  = this.minValue +' - '+ this.maxValue ;
    this.Date = this.multiForm.value.date;
    this.Time = this.multiForm.value.time;


}






  //************************ */


// selecting preferred provider
  onSelectV(id:any , name:any , surname:any){ 
    
    if(id > 0){

      this.value = this.value + 1


      this.bookingVenueForm.value.user_id1 = this.loggedinUser_id; // client id
      this.bookingVenueForm.value.user_id2 = id; // provider id
      this.bookingVenueForm.value.partyType =  this.multiForm.value.partyType;
      this.bookingVenueForm.value.num_guests = this.minValue +' - '+ this.maxValue ;
      this.bookingVenueForm.value.date = this.multiForm.value.date;
      this.bookingVenueForm.value.time = this.multiForm.value.time;
      this.bookingVenueForm.value.location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city
      this.bookingVenueForm.value.service_name = "Venue"
 
   
      console.log(this.bookingVenueForm.value)
      this.venue =  name+' '+surname 
      console.log(this.venue)

      this.partyType = this.multiForm.value.partyType;
      this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
      this.numGuests  = this.minValue +' - '+ this.maxValue ;
       this.Date = this.multiForm.value.date;
      this.Time = this.multiForm.value.time;


    }
    

  }

  //********************** */









  onSelectC(id:any , name:any , surname:any){ 
    
    if(id > 0){

      this.value = this.value + 1


      this.bookingCateringForm.value.user_id1 = this.loggedinUser_id; // client id
      this.bookingCateringForm.value.user_id2 = id; // provider id
      this.bookingCateringForm.value.partyType =  this.multiForm.value.partyType;
      this.bookingCateringForm.value.num_guests = this.minValue +' - '+ this.maxValue ;
      this.bookingCateringForm.value.date = this.multiForm.value.date;
      this.bookingCateringForm.value.time = this.multiForm.value.time;
      this.bookingCateringForm.value.location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city
      this.bookingCateringForm.value.service_name = "Catering"
 
 
      console.log(this.bookingCateringForm.value)

      
      //assign booking details

     
      this.cater = name+' '+surname 
      console.log(this.cater)

      this.partyType = this.multiForm.value.partyType;
      this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
      this.numGuests  = this.minValue +' - '+ this.maxValue ;
      this.Date = this.multiForm.value.date;
      this.Time = this.multiForm.value.time;
      
    







    }
    

  }




  onSelectD(id:any , name:any , surname:any){ 
    
    if(id > 0){

      this.value = this.value + 1


      this.bookingDecoForm.value.user_id1 = this.loggedinUser_id; // client id
      this.bookingDecoForm.value.user_id2 = id; // provider id
      this.bookingDecoForm.value.partyType =  this.multiForm.value.partyType;
      this.bookingDecoForm.value.num_guests = this.minValue +' - '+ this.maxValue ;
      this.bookingDecoForm.value.date = this.multiForm.value.date;
      this.bookingDecoForm.value.time = this.multiForm.value.time;
      this.bookingDecoForm.value.location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city
      this.bookingDecoForm.value.service_name = "Deco"
 
      console.log('yes')
      console.log(this.bookingDecoForm.value)

      
      //assign booking details

     
      this.Decor = name+' '+surname 

      
      this.partyType = this.multiForm.value.partyType;
      this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
      this.numGuests  = this.minValue +' - '+ this.maxValue ;
       this.Date = this.multiForm.value.date;
      this.Time = this.multiForm.value.time;
    







    }
    

  }

//if for yes or no

  onSkip(){

     this.value = this.value + 2
     
     this.cater = this.cater
     console.log('sjsdd'+this.cater);


     this.partyType = "Baby Shower";
     this.Location = this.multiForm.value.Province +' '+' '+ this.multiForm.value.city;
     this.numGuests  = this.minValue +' - '+ this.maxValue ;
     this.Date = this.multiForm.value.date;
     this.Time = this.multiForm.value.time;


  }



  updateValue(event: any) {
    this.currentValue = event.target.value;
  }
  



  

 //get provider by id

onView(id:any){

  //geting provider profile


  this.service.getProviderbyID(id).subscribe((response:any)=>{

   this.providerProfile = response;
   //console.log(response);

   this.profileservice.getContent(id).subscribe((data:any)=>{

  
    this.content = data;
    this.gallery = data;

  })



 })

}  


onCancel(){
  this.value = 0;
}
  
  submit(){   

 
   if(this.bookingVenueForm.value.user_id2 === "" && this.bookingCateringForm.value.user_id2 === "" && this.bookingDecoForm.value.user_id2 === ""){

    this.toast.warning({detail:''+ this.name,summary:'No selected provider for Bookings',duration:1500,position: 'tr'});
    

   }else{

    if(this.venueAnswer === "yes"){

      this.service.booking(this.bookingVenueForm.value).subscribe((data)=>{
        console.log(data)
        this.toast.success({detail:'Thank you '+ this.name,summary:''+data,duration:3000,position: 'tr'});
  

      }),(error:HttpErrorResponse)=>{

        console.log('invalid booking details')
      }

    }

   

    if(this.cateranswer === "yes"){

      
      this.service.booking(this.bookingCateringForm.value).subscribe((data)=>{
        console.log(data)
      }),(error:HttpErrorResponse)=>{

        console.log('invalid booking details')
      }

    }

    if(this.Decoanswer === "yes"){

      
      this.service.booking(this.bookingDecoForm.value).subscribe((data)=>{
        console.log(data)
      }),(error:HttpErrorResponse)=>{

        console.log('invalid booking details')
      }

    }

   }

  }
  
}
