import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
