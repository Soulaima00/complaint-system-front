import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {ReclamationService} from "../../Services/reclamation-service";
import {IReclamation, Reclamation} from "../model/reclamation.models";
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  public addClaimForm!: FormGroup;
  public image!: File;
  public types : any;
  public stypes : any;
  public reclamation!: IReclamation;
  get f() { return this.addClaimForm.controls; }

  constructor(private formBuilder: FormBuilder, private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.reclamationService.allTypeReclamation().subscribe(reslt => {
      this.types = reslt.body;
    });

    this.addClaimForm = this.formBuilder.group({
      message: [null],
      sousTypeReclamation: [null, [Validators.required]],
      typeReclamation: [null, [Validators.required]],
      observation: [null ],
      createdBy: ['soulaima']
    });
  }

  confirmSave(){


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

        this.addClaim();
      }
    })
  }
  addClaim(){
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




      this.reclamationService.create(this.addClaimForm.value.message,this.addClaimForm.value.sousTypeReclamation, this.addClaimForm.value.createdBy  , this.image)
        .subscribe(firstMethodResult => {
          this.addClaimForm.reset();
          Swal.close();
          Swal.fire(
            'Notification!',
            'Reclamation envoyée avec succés.',
            'success'
          )

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

  aaaaa(event: any) {

    this.image = event.target.files[0];
  }

  getSousTypeByType() {
    this.reclamationService.allSousTypeReclamation(this.addClaimForm.value.typeReclamation.id).subscribe(reslt => {
      this.stypes = reslt.body;
    });
  }
}
