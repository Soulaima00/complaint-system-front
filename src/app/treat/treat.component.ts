import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ReclamationService} from "../../Services/reclamation-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-treat',
  templateUrl: './treat.component.html',
  styleUrls: ['./treat.component.css']
})
export class TreatComponent implements OnInit {
  reclamations: any[] | any;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  displayData: boolean = false;
  reclamation: any;
  public addClaimForm!: FormGroup;
  activePage: string="treat";

  constructor(private formBuilder: FormBuilder, public sanitizer: DomSanitizer ,private modalService: NgbModal , private router: Router, protected http: HttpClient, private reclamationService: ReclamationService) {
  }
  ngOnInit(): void {
    this.reclamationService.allReclamation().subscribe(x=>{
      this.reclamations= x.body;
      this.dtTrigger.next();

    }) ;
    this.addClaimForm = this.formBuilder.group({
      observation: [null],
    });
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

  confirmSave() {
    Swal.fire({
      title: 'Confirmation!',
      text: 'Voulez vous confirmer !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui je confirme !',
      cancelButtonText: 'Annuler'

    }).then((result) => {
      if (result.isConfirmed) {

        this.treatClaim();
      }
    })
  }
  treatClaim(){
    if (this.addClaimForm.valid) {
      Swal.fire({
        html: 'veuillez patienter , envoi en cours ...',
        icon: 'info',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      const obj=  {
        id: this.reclamation.id,
        observation: this.addClaimForm.value.observation,
        modifiedBy:  "admin"
      }


      this.reclamationService.treat(obj)
        .subscribe(firstMethodResult => {
          this.addClaimForm.reset();
          Swal.close();
          Swal.fire(
            'Notification!',
            'Reclamation traitée avec succés.',
            'success'
          )
          this.modalService.dismissAll();

          this.reclamationService.allReclamation().subscribe(x=>{
            this.reclamations= x.body;

          }) ;

        }, error => {
          Swal.fire(
            'Notification!',
            'Erreur trouvé lors de sauvgarde.',
            'error'
          )
          this.addClaimForm.reset();
        });
    }
    else{
      Swal.fire(
        'Notification!',
        'Veuillez remplir les champs obligatoire',
        'error'
      )
    }

  }
}
