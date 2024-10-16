import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  activePage: string="about";
  isAdmin:Boolean=true;
  constructor() { }

  ngOnInit(): void {
    localStorage.getItem("isAdmin")=="true"?this.isAdmin=true:this.isAdmin=false;
  }

}
