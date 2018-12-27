import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
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
  styleUrls: [
    './css/font-awesome.min.css',
    './css/bootstrap.min.css',
    './css/style.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {

  constructor(private cs: CabinetMedicalService) {

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
