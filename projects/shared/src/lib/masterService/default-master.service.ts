import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { map } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { CredentialsService } from '../core/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultMasterService {

  private apiUrl = 'https://master.dev.elixirhr.com/'
  constructor(private http: HttpClient, private credService: CredentialsService) { }

  // Bank Variables 
  bankEditmode = new BehaviorSubject<boolean>(false);
  bankEditdata = new Subject<any>();
  transferEditdata = new Subject<any>();
  // Bank Details Master---------------------------------------------------------------------
  getBankDetails() {

    return this.http.get(`${this.apiUrl}api/BankMasters/GetBankMasters`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getBankdetailsbyId(bankId: string) {
    return this.http.get(`${this.apiUrl}api/BankMasters/GetBankMasters/${bankId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  PostBankDetails(data: any) {
    return this.http.post(`${this.apiUrl}api/BankMasters/PostBankMaster/`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  bulkuploadBank(file: any){
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}api/BankMasters/BankBulkUpload`, formData).pipe(
      map((res: any) => {
        return res;
      })
    );
   
  }
  deleteBank(id: string) {
    return this.http.delete(`${this.apiUrl}api/BankMasters/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}