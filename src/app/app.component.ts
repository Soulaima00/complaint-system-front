import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth.service'; // Import the AuthService

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
  
  public isLoggedIn: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}  // Inject AuthService
  
  ngOnInit(): void {}

  login() {
    const { login, password } = this.signupForm.value;

    if (login && password) {
      // Use the AuthService to authenticate the user
      if (this.authService.authenticate(login, password)) {
        this.isLoggedIn = true;
        this.router.navigate(['/dashboard']);  // Navigate based on the user credentials
      } else {
        Swal.fire('Notification!', 'Email ou mot de passe incorrect !', 'error');
      }
    } else {
      Swal.fire('Notification!', 'Veuillez remplir les champs obligatoire !', 'error');
    }
  }
}
