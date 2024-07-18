import { HttpClient,HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs';
import { CredentialsService } from '../core/credentials.service';
import { environment } from '../../../../shell/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonMasterService {
  private apiUrl = environment.masterUrl;
  constructor(private http: HttpClient,private credService: CredentialsService) { }
// apis related to country master
getCountryMasters(companyId?:any) {
  return this.http.get(`/api/Organisations/GetMasterforHirarchy/2/${companyId}`).pipe(
    map((res: any) => {
      return res;
    })
  );
}


  addCountry(data: any) {
    return this.http.post(`${this.apiUrl}/api/CountryMasters/PostCountryMaster`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  editCountry(data: any, id: string) {
    return this.http.put(`${this.apiUrl}/api/CountryMasters/PutCountryMaster/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteCountry(id: string) {
    return this.http.delete(`${this.apiUrl}/api/CountryMasters/CountryDelete/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  bulkuploadCountry(file: any){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/api/CountryMasters/CountryBulkUpload`, formData).pipe(
      map((res: any) => {
        return res;
      })
    );
   
  }
  //apis related to state master
  getSateMasters() {
    return this.http.get(`${this.apiUrl}/api/StateMasters/GetStateMasters`).pipe(
      map((res: any) => {
        return res.filter((state: any) => state.stateName !== 'Select State' || state.countryName !== 'Select Country');
      })
    );
  }

  getSatesFromCountryId(countryId:any,companyId?:any) {
    return this.http.get(`/api/Organisations/GetMasterDetails/2/${countryId}/countryid/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  addState(data: any) {
    return this.http.post(`${this.apiUrl}/api/StateMasters/PostStateMaster`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  editState(data: any, id: string) {
    return this.http.put(`${this.apiUrl}/api/StateMasters/PutStateMaster/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteState(id: string) {
    return this.http.delete(`${this.apiUrl}/api/StateMasters/StateDelete/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  bulkuploadState(file: any){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/api/StateMasters/BulkUpload`, formData).pipe(
      map((res: any) => {
        return res;
      }));
  }  
}
