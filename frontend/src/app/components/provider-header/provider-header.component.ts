import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-provider-header',
  templateUrl: './provider-header.component.html',
  styleUrls: ['./provider-header.component.scss']
})
export class ProviderHeaderComponent implements OnInit {

  user_id: any;
  countNotify: any;
  isvisible = false;
  overflow = "";

  constructor(private jwt:JwtService, private router : Router, private profileService: ProfileService) { }
  initials:any;

  ngOnInit(): void {
    this.user_id = this.jwt.getData(sessionStorage.getItem('token')).user_id;

  this.getLoggedinUserDetails()
  }


  onClick(){
    this.isvisible = true
   
    console.log(this.isvisible)
    location.reload()
    
  }
  
  menu(){
    this.overflow = "fixed"
    console.log('milgji')
  }

  logout()
  {
    sessionStorage.clear();
    localStorage.clear();
   // this.isLoggedIn = false;
   // clearInterval(this.ref);
   // sessionStorage.setItem('isLoggedIn','no');
    this.router.navigateByUrl('/home');
    // if(this.jwt.getData('token').length ==0)
    // {
    //   this.router.navigateByUrl('/home');
    // }
  }

  getLoggedinUserDetails(){
    const {user_email,user_name,user_lastname,account,user_id} = this.jwt.getData(sessionStorage.getItem('token'));
   
   
    this.profileService.getUser(this.user_id).subscribe((res:any)=>{
    this.initials = res.user_name.substr(0,1).toUpperCase() + res.user_lastname.substr(0,1).toUpperCase()
    console.log(res.user_name + res.user_lastname)

    });
   
   
    
    
  }
}
