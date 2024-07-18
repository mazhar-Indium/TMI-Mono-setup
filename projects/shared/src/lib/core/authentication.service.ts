import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Credentials, CredentialsService } from './credentials.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
export interface LoginContext {
  email: string;
  password: string;
  remember?: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient,
  ) {}

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }

  //  login(token: any) {
  //     return this.http
  //       .get(`/auth/tmilogin`, {
  //         params: {
  //           authcred: token,
  //         },
  //       })
  //       .pipe(
  //         map((res: any) => {
  //           let userData = {
  //             client_id: res.client_id,
  //             token: res.token,
  //             userrole: res.userrole,
  //             user_id: res.user_id,
  //             user_designation: res.user_designation,
  //             user_email: res.user_email,
  //             user_firstname: res.user_firstname,
  //             user_lastname: res.user_lastname,
  //             userdept: res.userdept,
  //             created_by: res.created_by,
  //           };
  //           this.credentialsService.setCredentials(userData, false);
  //           return res;
  //         })
  //       );
  //   }

  login (userDetails: any): Observable<any[]> {
    userDetails.isLogin = true;
    let x = JSON.stringify(userDetails)
    
    return this.http
      .post<any[]>('/api/Account/PostGetToken', JSON.stringify(userDetails))
      .pipe(
        map((res: any) => {
          console.log('Response: ', res);
          let userData = {
            accessControl: res.accessControl,
            emailId: res.emailId,
            employeeId: res.employeeId,
            guidId: res.guidId,
            isFirstLogin: res.isFirstLogin,
            isOwnerCompany: res.isOwnerCompany,
            isPasswordExpired: res.isPasswordExpired,
            refreshToken: res.refreshToken,
            token: res.token,
            userName: res.userName,
            validity: res.validaty,
            employeeRoleList: res.accessControl.EmployeeDetails.employeeRoleList,
            currentCompany: res.accessControl.CompanyDetails.Companies.filter(
              (item: any) => {
                 return (
                  res.currentCompanyId == 
                  res.accessControl.CompanyDetails.defaultCompanyId
                );
              }
            )[0],
          };
          console.log('coming inrto me');
          let mergedScreenPermissions:any[] = [];
          userData.currentCompany.AccessControls.forEach((moduleName: any) => {
            moduleName.Screens.forEach((screenName: any) => {
              console.log('adding screen to merged',screenName);
              mergedScreenPermissions.push(screenName);
            })
          });
          this.credentialsService.setCredentials(userData, false);
          this.credentialsService.setPermissions(mergedScreenPermissions);
          return res;
        })
      );
  }

  checkEmail(EmailId: any,Organization: any){
    return this.http.get(`/api/EmployeePersonalDetails/IsEmailIdValid/${EmailId}/${Organization}`).pipe(

      map((res: any) => {

        return res;

      })

    )};

    reset_password(EmployeeId: any,PassKey: any, NewPassword: any,data:any){

      return this.http.put(`/api/PasswordConfigurations/ResetPassword/${EmployeeId}/${PassKey}/${NewPassword}`,data).pipe(

        map((res: any) => {

          return res;

        })

      )};

}

