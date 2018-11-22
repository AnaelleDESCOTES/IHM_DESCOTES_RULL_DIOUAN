import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {PatientInterface} from '../dataInterfaces/patient';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.scss']
})
export class SecretaryComponent implements OnInit {

  private cabinet: CabinetInterface;

  constructor(private cs: CabinetMedicalService) {
    this.getCabinet();
  }

  ngOnInit() {
  }

  getPatient(patient: PatientInterface) {}


  getInfirmier(infirmier: InfirmierInterface) {}


  get Patients(): PatientInterface[] {
    return this.cabinet ? this.cabinet.patientsNonAffectés : [];
  }

  get Infirmiers(): InfirmierInterface[] {
    return this.cabinet ? this.cabinet.infirmiers : [];
  }

  private async getCabinet() {
    this.cabinet = await this.cs.getData('/data/cabinetInfirmier.xml');
  }
}
