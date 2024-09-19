import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isLoggedIn: any;
  signupForm = this.fb.group({
    login: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });
  constructor(private fb: FormBuilder,private authService : AuthService, private cdr: ChangeDetectorRef) {}  // Inject AuthService
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(
      (status: boolean) => {
        this.isLoggedIn = status;
        this.cdr.detectChanges(); // Ensure Angular detects changes
        console.log('Login status in AppComponent:', status); // For debugging
      }
    );  }
}
