import {Component, Input, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {Adresse} from '../dataInterfaces/adresse';

@Component({
  selector: '[app-infirmier]',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.scss']
})
export class InfirmierComponent implements OnInit {

  @Input() data: InfirmierInterface;

  constructor(private cs: CabinetMedicalService) {}

  get prenom(): string {
    return this.data.prénom;
  }

  get adresse(): string {
    return this.etage + ' ' + this.numero + ' ' + this.data.adresse.rue + ' ' + this.data.adresse.ville + ' ' + this.data.adresse.codePostal;
  }

  get patients(): PatientInterface[] {
    return this.data.patients;
  }

  get etage(): string {
    let et: string;
    this.data.adresse.étage ? et = this.data.adresse.étage : et = '';
    return et;
  }

  numeroSecuriteSociale(p: PatientInterface): string {
    return p.numéroSécuritéSociale;
  }

  get numero(): string {
    return this.data.adresse.numéro;
  }

  ngOnInit() {
  }

}
