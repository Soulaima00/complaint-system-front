import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ReclamationService} from "../../Services/reclamation-service";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})

export class FollowComponent implements OnInit{
  idCreator: any;
  activePage: string="follow";

  reclamations: any[] | any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  displayData: boolean = false;
  reclamation: any;
  constructor(public sanitizer: DomSanitizer ,private modalService: NgbModal , private router: Router, protected http: HttpClient, private reclamationService: ReclamationService) {
    this.idCreator = localStorage.getItem('vi2');

  }
  ngOnInit(): void {
// this.reclamationService.allReclamation().subscribe(x=>{
//     this.reclamations= x.body;
//   this.dtTrigger.next();

// }*) ;
 this.reclamationService.allReclamationByUser(this.idCreator).subscribe(x=>{
      this.reclamations= x;}
      
      
      );
      console.log( this.reclamations);

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      dom: 'Bfrtip',
      destroy: true,
      // Configure the buttons
      buttons: [
        { extend: 'copy', text: '', className: 'btn text-white bg-warning fa fa-clone' },
        { extend: 'excel', text: '', className: 'btn text-white bg-success  fa fa-file-excel-o' },
        { extend: 'print', text: '', className: 'btn text-white bg-danger  fa fa-file-pdf-o' },

        {
          text: '',
          className: 'btn text-white bg-info  fa fa-plus',

          action: () => {
            this.goToAddPage();
          }
        }
      ]

    };

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  goToAddPage(){
    console.log('... go to add claim page')
    this.router.navigateByUrl('/claim');

  }
  listResiliation(req?: any): Observable<HttpResponse<any[]>> {
    return this.http
      .get<any>('assets/json/reclamation.json', { params: req, observe: 'response' })
      .pipe();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);

  }

  }

  openModalEdit(EditModal: any, c: any) {
    this.displayData = true;
    this.reclamation = c;
    this.modalService.open(EditModal);

  }
}
