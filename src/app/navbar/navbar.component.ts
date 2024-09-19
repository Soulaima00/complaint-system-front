import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/Services/auth.service';
import { NavbarService } from 'src/Services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  links: { name: string; route: string }[] = [];
  isAdmin : boolean = false;
  constructor(private authService: AuthService, private navbarService: NavbarService) { }

  
  ngOnInit() {
    this.navbarService.links$.subscribe(links => {
      this.links = links;
    });

    this.isAdmin = this.authService.getIsAdmin();
    console.log('Is Admin:', this.isAdmin);
  }


  logout() {
    this.authService.logout();
  }
}
