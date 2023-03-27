import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { ClientBookingsService } from 'src/app/services/client-bookings.service';
import { JwtService } from 'src/app/services/jwt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from 'src/app/services/bookings.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { NgxSmartLoaderService, NgxSmartLoaderModule } from 'ngx-smart-loader';

@Component({
  selector: 'app-client-bookings',
  templateUrl: './client-bookings.component.html',
  styleUrls: ['./client-bookings.component.scss']
})
export class ClientBookingsComponent implements OnInit {
bookings!: any;
prov_id:any;
booking_id:any;
numGuests : any;
numG : any= ['1-50', '50-150','150-350','350-500'];
 bookStatus:any;
  constructor (private jwt:JwtService, private clientBookingsService: ClientBookingsService, private bookService:BookingsService, private toast:NgToastService, private router:Router,public loader: NgxSmartLoaderService) { }

  loggedinUser_id :any;

  ngOnInit(): void {
    this.loader.start('myLoader');
    this.getLoggedinUserDetails()

    console.log(this.loggedinUser_id)
    this.clientBookingsService.get(this.loggedinUser_id).subscribe((result:any)=>{
      this.bookings = result;
      this.loader.stop('myLoader');
     console.log(result);
    })
    
  }

  bookingUpdateForm = new FormGroup({
    num_guests: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
  });
  // BookingForm: FormGroup = new FormGroup({
  //   booking_id: new FormControl(''),
  //   booking_status: new FormControl('')
  // });


getBookId(bookid:any)
{
  this.booking_id = bookid;
  console.log('booking ID: ' + this.booking_id);
  sessionStorage.setItem('booking_id', this.booking_id)
}

  getProvId(id:any){
this.prov_id = id;
console.log("prov_id:"+ this.prov_id)
sessionStorage.setItem('prov_id', this.prov_id)
  }
  

  getLoggedinUserDetails(){
    const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(sessionStorage.getItem('token'));
     
    this.loggedinUser_id = user_id;
    
  }

onSubmit(){

    this.bookService.bookingDetailsUpdate(this.booking_id, this.bookingUpdateForm.value).subscribe((response:any)=>{
      this.toast.success({detail:'Succes',summary:'You successfuly updated the booking',duration:2500,position: 'tr'});
      this.router.navigateByUrl('/clientbookings');
      this.router.navigate(['/clientbookings'])
        .then(() => {
          window.location.reload();
        });
    },(error:HttpErrorResponse)=>{
      this.toast.error({detail:'Error',summary:'Update booking failed',duration:3000,position: 'tr'});
      console.log(error)
                })
    }


cancelBooking(){
  //this.bookingUpdateForm.value.status="Cancelled";
  console.log(this.booking_id);
  this.bookService.cancelBooking(this.booking_id, this.bookingUpdateForm.value).subscribe((response:any)=>{
    this.router.navigate(['/clientbookings'])
    .then(() => {
      window.location.reload();
    });
    console.log(this.bookStatus)
    this.toast.success({detail:'Succes',summary:'You successfuly cancelled the booking',duration:2500,position: 'tr'});
    //this.router.navigateByUrl('/clientbookings');

    },(error:HttpErrorResponse)=>{
      this.toast.error({detail:'Error',summary:'Failed to cancel',duration:3000,position: 'tr'});
      console.log(error)
  })
}


}
