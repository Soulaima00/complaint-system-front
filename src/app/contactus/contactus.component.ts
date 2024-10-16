import { Component, OnInit } from '@angular/core';
import { faPhone , faFax , faLocationArrow , faEnvelope } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
 icon1 = faPhone
  fax = faFax
  loca = faLocationArrow
  mail = faEnvelope
  constructor() { }
  activePage: string="contactus";

  ngOnInit(): void {
  }

}
