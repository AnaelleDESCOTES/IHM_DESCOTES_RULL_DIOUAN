import {Component, Input, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';
import {sexeEnum} from '../dataInterfaces/sexe';
import {HttpResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  constructor(private cs: CabinetMedicalService) {
  }

  affecterPatient(i: string, p: PatientInterface): any {
     this.cs.affecterPatient(i, p);
  }

  creerPatient(prenom: string, nom: string, sexe: sexeEnum, etage: string, numero: string, rue: string, ville: string, codePostal: number, securiteSocial: string ) {
    this.cs.creerPatient(prenom, nom, sexe, etage, numero, rue, ville, codePostal, securiteSocial);
  }

  ngOnInit() {
  }

  get patientsNonAffectes(): PatientInterface[] {
    return this.cs.patientsNonAffectes;
  }
  get infirmiers(): InfirmierInterface[] {
    return this.cs.infirmiers;
  }



}
