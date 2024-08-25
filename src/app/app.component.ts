import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {


  signupForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  public isLoggedIn : boolean = false 
  constructor(private fb: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    
  }

  login() {

    if (this.signupForm.value.login && this.signupForm.value.password){

      if (this.signupForm.value.login == 'admin' && this.signupForm.value.password == 'admin'){
        this.isLoggedIn = true
        console.log('heyyyy')
        this.router.navigate(['/treat'])
        
      }
      else if (this.signupForm.value.login == 'aymen' && this.signupForm.value.password == 'aymen'){
        this.isLoggedIn = true
        console.log('heyyyy')
        this.router.navigate(['/dashboard'])

      }else {
        Swal.fire(
          'Notification!',
          'Email ou mot de passe incorrect !',
          'error'
        )
      }

    }else {
      Swal.fire(
        'Notification!',
        'Veuillez remplir les champs obligatoire !',
        'error'
      )
    }



  }
}
