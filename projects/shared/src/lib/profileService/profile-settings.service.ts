import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileSettingsService {
  constructor(private http: HttpClient) {}

  // API Calls related to Password Change

  getCurrentPassword(EmployeeId: any, OldPassword: any, NewPassword: any) {
    return this.http
      .put(
        `/api/PasswordConfigurations/ChangePassword/${EmployeeId}/${OldPassword}/${NewPassword}`,""
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // API Calls related to Reset Password Change (first password)
  getResetPassword(EmployeeId: any, PassKey: any, NewPassword: any,data:any) {
    return this.http
      .put(
        `/api/PasswordConfigurations/ResetPassword/${EmployeeId}/${PassKey}/${NewPassword}`,data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // API Call to get Password Policy

  getPasswordPolicy(id: any) {
    return this.http.get(`/api/PasswordConfigurations/GetPasswordConfiguration/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // API Call to get Is Email Valid
  getIsEmailValid(email: any) {
    return this.http.get(`/api/EmployeePersonalDetails/IsEmailIdValid/${email}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //API CALL FOR UPDATING PASSWORD POLICY
  updatePasswordPolicy(data: any, id: any) {
    return this.http.put(`/api/PasswordConfigurations/PutPasswordConfiguration/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Api calls related to MY PROFILE

  /***API CALL FOR GETTING MY PROFIL DATA *
   * @param id for fetching data for perticular id
   * *****/
  getMyProfile(id: any) {
    return this.http.get(`/api/EmployeePersonalDetails/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR UPDATING MY PROFILE INFO ******
   * @param data have data to update user
   * @param id have id for applying edit opration
   * **/
  updateProfile(data: any, id: any) {
    return this.http.put(`/api/EmployeePersonalDetails/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /************API CALLS RELATED TO DASHBOARD PAGE*********
   * @param empId for fetching account reports of companies for which employee have access
   * **/
  getAccountReport( empId: any) {
    return this.http.get(`/api/Organisations/CompanyStorageReport/${empId}`).pipe(
      map((res: any) => {
        console.log('res is',res);
        return res;
      })
    );
  } 

}

