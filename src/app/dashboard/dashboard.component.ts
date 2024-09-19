import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/Services/navbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private navbarService: NavbarService) {}
  
addSubmitLink() {
    this.navbarService.links$.subscribe(links => {
      // Check if the 'Submit' link already exists
      const linkExists = links.some(link => link.name === 'Submit');

      if (!linkExists) {
        // Add 'Submit' link if it doesn't already exist
        const updatedLinks = [...links, { name: 'Submit', route: '/claim' }];
        this.navbarService.setLinks(updatedLinks);
      }
    });
  }  

  addFollowLink() {
    this.navbarService.links$.subscribe(links => {
      // Check if the 'Submit' link already exists
      const linkExists = links.some(link => link.name === 'follow');

      if (!linkExists) {
        // Add 'Submit' link if it doesn't already exist
        const updatedLinks = [...links, { name: 'follow', route: '/follow' }];
        this.navbarService.setLinks(updatedLinks);
      }
    });
  }

  ngOnInit(): void {
  }

}
