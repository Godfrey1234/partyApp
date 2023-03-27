import { Component, OnInit } from '@angular/core';
import { PartyTainersService } from 'src/app/services/party-tainers.service';
import { FormBuilder, FormControl, FormGroup, NgForm,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-form',
  templateUrl: './multi-form.component.html',
  styleUrls: ['./multi-form.component.scss']
})
export class MultiFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
