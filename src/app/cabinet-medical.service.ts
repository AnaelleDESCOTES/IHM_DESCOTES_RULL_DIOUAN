import { Injectable } from '@angular/core';
import {CabinetInterface} from './dataInterfaces/cabinet';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Adresse} from './dataInterfaces/adresse';
import {InfirmierInterface} from './dataInterfaces/infirmier';
import {PatientInterface} from './dataInterfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  constructor(private _http: HttpClient) { }

  private getAdresseFrom(adXML: Element): Adresse {
    let n;
    return {
      étage: (n = adXML.querySelector('étage')) ? n.textContent : undefined,
      numéro: (n = adXML.querySelector('numéro')) ? n.textContent : undefined,
      rue: (n = adXML.querySelector('rue')) ? n.textContent : undefined,
      ville: (n = adXML.querySelector('ville')) ? n.textContent : undefined,
      codePostal: (n = adXML.querySelector('codePostal')) ? n.textContent : -1
    };
  }

  async getData(url: string): Promise<CabinetInterface> {
    const cab: CabinetInterface = {
      infirmiers: [],
      patientsNonAffectés: [],
      adresse: undefined,
    };
    try {
      const res: HttpResponse<string> = await this._http.get(url, {observe: 'response', responseType: 'text'}).toPromise();
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.body, 'text/xml');
      // @ts-ignore
      const LInfXML = Array.from( doc.querySelectorAll('infirmiers infirmier') );

      const infirmiers: InfirmierInterface[] = LInfXML.map(infXML => ({
          patients: [],
          id: infXML.getAttribute('id'),
          nom: infXML.querySelector('nom').textContent,
          prénom: infXML.querySelector('prénom').textContent,
          photo: infXML.querySelector('photo').textContent,
          adresse: this.getAdresseFrom(infXML.querySelector('adresse'))
      }));
      cab.infirmiers = infirmiers;

      const LPatXML = Array.from( doc.querySelectorAll('patients patient') );
      // @ts-ignore
      const patients: PatientInterface[] = LPatXML.map(patXML => ({
          nom: patXML.querySelector('nom').textContent,
          prénom: patXML.querySelector('prénom').textContent,
          sexe: patXML.querySelector('sexe').textContent,
          numéroSécuritéSociale: patXML.querySelector('numéro'),
          adresse: this.getAdresseFrom(patXML.querySelector('adresse'))
      }));

      const affectations = LPatXML.map((patXML, i) => {
        let n;
        const infId = (n = patXML.querySelector('visite[intervenant]')) ? n.getAttribute('intervenant') : undefined;
        return {
          patient: patients[i],
          infirmier: infirmiers.find(inf => inf.id === infId)
        };
      });

      affectations.forEach(aff => {
        const inf = aff.infirmier;
        const pat = aff.patient;
        if (inf) {
          inf.patients.push(pat);
        } else {
          cab.patientsNonAffectés.push(pat);
        }
      });
      console.log(cab);

    console.log(doc);
    } catch (err) {
      console.error('ERROR in getData', err);
    }
    return cab;
  }

}
