import {Component, Input, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';
import {sexeEnum} from '../dataInterfaces/sexe';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  @Input() data: PatientInterface;

  constructor(cs: CabinetMedicalService) { }

  get prenom(): string {
    return this.data.prénom;
  }

  get adresse(): string {
    return this.etage + ' ' + this.numero + ' ' + this.data.adresse.rue + ' ' + this.data.adresse.ville + ' ' + this.data.adresse.codePostal;
  }

  get etage(): string {
    let et: string;
    this.data.adresse.étage ? et = this.data.adresse.étage : et = '';
    return et;
  }

  get numero(): string {
    return this.data.adresse.numéro;
  }

  get numeroSecuriteSociale(): string {
    return this.data.numéroSécuritéSociale;
  }


  ngOnInit() {
  }

}
