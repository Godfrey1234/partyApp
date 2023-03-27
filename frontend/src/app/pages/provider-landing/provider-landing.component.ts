import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BookingsService } from 'src/app/services/bookings.service';
import { JwtService } from 'src/app/services/jwt.service';
import { NgxSmartLoaderService, NgxSmartLoaderModule } from 'ngx-smart-loader';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { Router } from '@angular/router';
import { time } from 'console';

@Component({
  selector: 'app-provider-landing',
  templateUrl: './provider-landing.component.html',
  styleUrls: ['./provider-landing.component.scss']
})
export class ProviderLandingComponent implements OnInit {

  BookingForm: FormGroup = new FormGroup({
    booking_id: new FormControl(''),
    booking_status: new FormControl(''),
    date:new FormControl(''),
    time: new FormControl(''),
    provider_id :new FormControl(''),
    client_id : new FormControl(''),
    message: new FormControl(''),
  });



  // "date": "2022-05-12",
  // "time":"11:50",
  // "client_id":"54",
  // "provider_id": "53",
  // "booking_status": "pending"
 


  bid!:any;
  client_id : any
  bookings: any[] =[];
  users!:any;
  submitted = false;
  num_pending = 0;
  num_cancelled = 0;
  num_approved = 0;
  num_declined = 0;
  searchText:any = '';
  message:any;
  name:any;
  surname:any;
  service:any;

  id = 2;
  loop :any

  constructor(private bookingService: BookingsService, public fb: FormBuilder ,private jwt:JwtService,public loader: NgxSmartLoaderService, private router: Router) { }

  ngOnInit(): void {
   
    const {user_email,user_name,user_lastname,account,user_id,service} = this.jwt.getData(sessionStorage.getItem('token'));
    this.id = user_id;
    this.name = user_name; 
    this.surname = user_lastname;
    this.service = service;
   
    console.log(this.message)
   
   this.milata();

 
   this.loader.start('myLoader');
   setTimeout(() => {
    this.loader.stop('myLoader');
    },2000);
     
    this.bookingService.GetList(this.id).subscribe((res:any) => {
      this.bookings = res;

      this.BookingForm.value.client_id = res[0].user_id1
      console.log(res)
      
    });
    
  }


milata(){
 
  this.bookingService.GetPending(this.id).subscribe((res:any) => {
    console.log(res);
    this.num_pending = res;
  });

  this.bookingService.GetCancelled(this.id).subscribe((res:any) => {
    console.log(res);
    this.num_cancelled = res;
  });

  this.bookingService.GetApproved(this.id).subscribe((res:any) => {
    console.log(res);
    this.num_approved = res;
  });

  this.bookingService.GetDeclined(this.id).subscribe((res:any) => {
    console.log(res);
    this.num_declined = res;
  
  });

}





//   onAproved(id:any){

//  console.log(id)
//   }

//   onDecline(id:any){

//     console.log(id)

//   }

onCancelled(){

  console.log('yes milata')
  this.searchText = "Cancelled"

}

onPending(){

  console.log('yes milata')
  this.searchText = "Pending"

}  

  onApproved(){

    console.log('yes milata')
    this.searchText = "Approved"

  }
  
  onDeclined(){

    console.log('yes milata')
    this.searchText = "Declined"

  }

  ViewAllBookings()
  {
    this.searchText = ""
  }


  updateBooking()
  {

       


      console.log(this.BookingForm.value)



    
    if(this.users[0].usertype =='provider')
    {
      let bookingDetails = {
        booking_id:this.BookingForm.value.booking_id,
        booking_status: this.BookingForm.value.booking_status
      }



      console.log(bookingDetails);

      this.bookingService.update(this.bid, this.BookingForm.value).subscribe((next) => {
        this.submitted = false;
      })

    }
    else{

      let bookingDetails = {
        booking_id:this.BookingForm.value.booking_id,
        booking_status: this.bookings[0].booking_status
      }

      console.log(bookingDetails);
      console.log(this.bid)
      
      this.bookingService.update(this.bid, this.BookingForm.value).subscribe((next) => {
        this.submitted = false;
      })

    }
  }

  onChange(value: any) {
    this.updateBooking = value.target.value;
}

data = {
  booking_status:''
}

 changeStatus(e:any, booking_id:any, client_id:any)
 {
  this.data.booking_status = e.target.value;

  this.BookingForm.value.date = new Date(),'MM:dd:yyyy';
  this.BookingForm.value.time = new Date(),'h:mm';
  this.BookingForm.value.provider_id = this.id;
  this.BookingForm.value.client_id = client_id
  this.BookingForm.value.booking_status =  e.target.value;
  this.BookingForm.value.booking_id = booking_id

  if(this.service = "Cater"){
    this.service = "Catering"
  }
  
  this.BookingForm.value.message = this.name+" "+this.surname+" has "+e.target.value + " your booking for "+this.service
  console.log(this.BookingForm.value.message)


  this.bookingService.update(booking_id, this.BookingForm.value).subscribe((next:any) => {
    // this.submitted = false;
    console.log(this.BookingForm.value)
    console.log("Done");
    this.milata();
    this.bookingService.GetList(this.id).subscribe((res:any) => {
      this.bookings = res;
      console.log(res)

    });
    
  },(err: HttpErrorResponse)=>{
    console.log(err);

  })

 }


}