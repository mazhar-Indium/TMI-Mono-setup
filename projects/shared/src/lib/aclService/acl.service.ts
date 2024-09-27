import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CredentialsService } from '../core/credentials.service';
import { SharedService } from '../sharedService/shared.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AclService {
  constructor(
    private http: HttpClient,
    private credentialService: CredentialsService,
    private credService: CredentialsService,
    private sharedService: SharedService
  ) { }

  private getHttpParams(params: any) {
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        httpParams = httpParams.set(key, element);
      }
    }
    return httpParams;
  }

  //Api calls related to Course

  // GETS the moduel list
  getModuleList() {
    return this.http.get(`/api/Modules?getAll=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR CREATING MODULE ******
   *  * @param data have data to create new MODULE
   */
  createModule(data: any) {
    return this.http.post(`/api/Modules`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getScreensList(moduleName: any) {
    return this.http
      .get(`/api/Modules/GetScreensList/${moduleName}`)
      .pipe(
        map((res: any) => {
          console.log('respone for screen list',res);
          return res;
        })
      );
  }

  enableModule(data: any, id: string) {
    return this.http.put(`/api/Modules/Enable/${id}/${data}`, null).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING & DISABLING MODULE ******
   * @param data have data to edit or disable MODULE
   * @param id have id for applying edit or disable option
   * **/
  editModule(data: any, id: string) {
    return this.http.put(`/api/Modules/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Api calls related to User-Creation
  getRoleName(CompanyId: any) {
    return this.http
      .get(`/api/UserRoles/GetUserRolesForCompanyId/${CompanyId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Api calls related to User-Creation without company Id
  getRoleNames() {
    return this.http
      //.get (`/api/UserRoles/GetUserRolesForCompanyId/${CompanyId}`)
      .get(`/api/EmployeePersonalDetails`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //post call for user creation
  createUser(data: any) {
    return this.http.post(`/api/EmployeePersonalDetails`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //UserList get api call

  getUserList() {
    return this.http.get(`/api/EmployeePersonalDetails?getAll=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING & DISABLING USER ******
   * @param data have data to edit USER
   * @param EmployeeId have id for applying edit or disable option
   * **/
  editUser(data: any, EmployeeId: string) {
    return this.http
      .put(`/api/EmployeePersonalDetails/${EmployeeId}`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Api calls related to SCREEN CREATION

  /***API CALL FOR GETTING LIST OF COMPANY MODULES ******/
  getCompanyModules(id: any) {
    return this.http.get(`/api/Modules/GetModulesForCompanyId/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR GETTING LIST OF ALL MODULES ******/
  getAllModules() {
    return this.http.get(`/api/Modules?getAll=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR CREATING SCREEN ******
   *  * @param data have data to create new SCREEN
   */
  createScreens(data: any) {
    return this.http.post(`/api/Screens`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR GETTING LIST OF SCREENS ******/
  getScreenList() {
    return this.http.get(`/api/Screens?getALL=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING & DISABLING SCREEN ******
   * @param data have data to edit or disable SCREEN
   * @param id have id for applying edit or disable option
   * **/
  editScreen(data: any, id: any) {
    return this.http.put(`/api/Screens/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //API CALLS RELATED TO USER GROUP

  /***API CALL FOR GETTING LIST OF USER GROUPS ******/
  getUserGroupList() {
    return this.http.get(`/api/UserRoles`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR CREATING USER GROUP ******
   *  * @param data have data to create new user group
   */
  createUserGroup(data: any) {
    return this.http.post(`/api/UserRoles/PostUserRole`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING & DISABLING USER GROUPS ******
   * @param data have data to edit or disable USER GROUP
   * @param id have id for applying edit or disable option
   * **/
  editUserGroup(RoleId: any, CompanyId: any) {
    return this.http.get(`/api/UserRoles/GetUsersOfUserRole/${RoleId}/${CompanyId}`)
    //return this.http.put(`/api/UserRoles/${id}`, data).pipe(
    map((res: any) => {
      return res;
    });
  }

  getRolesList() {
    return this.http
      .get(
        `/api/UserRoles/GetUserRolesForCompanyId/${this.credentialService.credentials?.currentCompany.companyId}`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getModulesGroups() {
    return this.http
      .get(
        `/api/Screens/GroupByModule/CompanyId?CompanyId=${this.credentialService.credentials?.currentCompany.companyId}`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getRoleBasedPermissions(roleId: any) {
    return this.http
      .get(`/api/ScreenPermissions/GetScreensForRoleId/${roleId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  saveScreenRolePermissions(id: any, requestBody: any) {
    return this.http.post(`/api/UserRoles/PostUserRole`, requestBody).pipe(
      // return this.http.put(`/api/ScreenPermissions/${id}`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateScreenRolePermissions(id: any, requestBody: any) {
    //return this.http.post(`/api/UserRoles`,requestBody).pipe(
    return this.http.put(`/api/ScreenPermissions/${id}`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  GetUserRolesForCompanyById(companyId: string) {
    return this.http
      //.get(`/api/UserRoles?GetAll=true`)
      .get(`/api/UserRoles/GetUserRolesForCompanyId/${companyId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getScreenPermissionDetails(ScreenUrlString: string) {
    let permissionsList: any[] = this.credService.getPermissions();
    console.log("PERMISSIONS",JSON.stringify(permissionsList));

    return permissionsList.find((item: any) => String(item.screenURL).includes(ScreenUrlString));
  }
  // getScreenPermissionDetails(screenUrlString: string): any | undefined {
  //   const permissionsList: any[] = this.credService.getPermissions();
  //   const matchingPermission = permissionsList.find((item: any) =>
  //     String(item.screenURL).toLowerCase() === screenUrlString.toLowerCase()
  //   );
  //   return matchingPermission;
  // }


  selectAllCheckbox(screenList: any[], permissionData: any[]) {
    let doSelectAll: any = {
      Create: true,
      Read: true,
      Update: true,
      Delete: true,
      Approve: true,
    };
    screenList.forEach((screen: any) => {
      let data = permissionData.filter((permissionScreen: any) =>
        permissionScreen.screenName.includes(screen)
      );
      if (data.length === 0) {
        doSelectAll = {
          Create: false,
          Read: false,
          Update: false,
          Delete: false,
          Approve: false,
        };
      }
    });
    for (let action of ['Create', 'Read', 'Update', 'Delete', 'Approve']) {
      permissionData.forEach((screen: any) => {
        if (screen[action] === false) {
          doSelectAll[action] = false;
        }
      });
    }
    return doSelectAll;
  }

  selectAllCheckboxDynamic(module: any[]) {
    let doSelectAll: any = {
      create: true,
      read: true,
      update: true,
      delete: true,
      approve: true,
    };

    for (let action of ['create', 'read', 'update', 'delete', 'approve']) {
     module.forEach((screenList:any) => {
      screenList.forEach((screen: any) => {
        if (screen.actionBooleans.action === false) {
          doSelectAll[action] = false;
        }
      });
    })
    return doSelectAll;
  }
  }

  selectAllOnLocalSingleChange(
    change: boolean,
    action: string,
    screenList: any[],
    currentGlobalStatus: any
  ) {
    if (change === true) {
      if (
        screenList.filter((screen: any) => screen.actionBooleans[action] === true)
          .length === screenList.length
      ) {
        currentGlobalStatus[action] = true;
      } else {
        currentGlobalStatus[action] = false;
      }
    } else {
      currentGlobalStatus[action] = false;
    }
    return currentGlobalStatus;
  }

  testGlobalCheckbox(screenList: any[],
    currentGlobalStatus: any) {
    for (let action in currentGlobalStatus) {
      if (screenList.filter((screen: any) => screen.actionBooleans[action] === true)
        .length === screenList.length){
          currentGlobalStatus[action] = true;
        }
        else{
          currentGlobalStatus[action] = false;
        }
      }
      return currentGlobalStatus;
  }
  testLocalCheckbox(module: any[],currentGlobalChecked: any) {
  module.forEach((screen:any) => {
      Object.keys(screen.actionBooleans).forEach(key => {
        if(screen.actionBooleans[key] !== screen.actionBooleans[currentGlobalChecked])
        {
          screen.actionBooleans[key] = false
        }
        return screen.actionBooleans;
      });
      //return screen
    });

  }

  // GETS the user management list
  getUserManagementList() {
    return this.http.get(`/api/EmployeePersonalDetails/GetUserManagementUsers`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUsersDropdown() {
    return this.http.get(`/api/EmployeePersonalDetails/GetTMIUsers`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getGroupsDropdown() {
    return this.http.get(`/api/UserRoles/GetUserRolesForCompanyId/1`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getClientsDropdown(employeeId: any) {
    return this.http.get(`/api/ClientCreations/ClientCreations/${employeeId}?getALL=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCompanyDropdown(ClientId: any) {
    return this.http.get(`/api/Organisations/GetCompaniesForClientId/${ClientId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING & DISABLING USER ******
  * @param requestBody have data to edit or disable USER
  * @param id have id for applying edit or disable option
  * **/
  updateUser(requestBody: any) {
    return this.http.put('/api/EmployeePersonalDetails/UpdateUserManagementDetails', requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  //user group apis

  checkUserRolesAvailabilty(Status: any, CompanyId: any, data: any) {
    return this.http.put(`/api/UserRoles/ValidateUserRoles/${Status}/${CompanyId}`, data).pipe(
      (res: any) => {
        return res;
      }, (error: any) => {
        return error;
      })
  }

  changeUserRolesStatus(Status: any, data: any) {
    return this.http.put(`/api/UserRoles/ChangeUserRoleStatus/${Status}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  checkUserAvailabilty(EmployeeId: any, RoleId: any, data: any) {
    return this.http.put(`/api/UserRoles/ValidateUserToRemove/${EmployeeId}/${RoleId}`, data).pipe(
      (res: any) => {
        return res;
      }, (error: any) => {
        return error;
      }
    );
  }

  changeUserStatus(EmployeeId: any, RoleId: any, data: any) {
    return this.http.put(`/api/UserRoles/RemoveUserRoleFromUser/${EmployeeId}/${RoleId}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Email Sent Method
  sendEmail(data: any, email?: any) {
    //console.log('Email data: ', data);
    if (email) {
      this.sharedService.sendEmail(data).subscribe((res: any) => {
        this.sharedService.toastMsg(`Mail has been sent to the Email ${email}`, 'success');
      });
    }
    else {
      this.sharedService.sendEmail(data).subscribe((res: any) => {
        this.sharedService.toastMsg(`Mail has been sent to all the participants`, 'success');
      });
    }
  }

  //Send SMS
  sendSMS(countryCode: any, mobileNumber: any,body:any,companyId:any) {

    //if (email) {
      this.sharedService.sendSMS(countryCode, mobileNumber,body,companyId).subscribe((res: any) => {
        this.sharedService.toastMsg(`SMS Sent Successfully`, 'success');
      });
    //}
    // else {
    //   this.sharedService.sendEmail(data).subscribe((res: any) => {
    //     this.sharedService.toastMsg(`Mail has been sent to all the participants`, 'success');
    //   });
    // }
  }

  validateDisableUser(EmployeeId: any) {
    return this.http.put(`/api/EmployeePersonalDetails/ValidateToDisableUser/${EmployeeId}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  disableUser(EmployeeId: any) {
    return this.http.put(`/api/EmployeePersonalDetails/DisableUser/${EmployeeId}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  enableUser(EmployeeId: any) {
    return this.http.put(`/api/EmployeePersonalDetails/ChangeEmployeeStatus/${EmployeeId}`, {}).pipe(
      (res: any) => {
        return res;
      }, (error: any) => {
        return error;
      }
    );
  }

  validateUserGroup(userGroupName: any) {
    return this.http.get(`/api/UserRoles/ValidateUserRole/${userGroupName}/0`).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))
  }

//from guanesh on Logo and profile pic

  // https://test.dev.elixirhr.com/api/Organisations/GetCompanyLogo/2
  getLogo(companyId: any) {
    return this.http.get(`/api/Organisations/GetCompanyLogo/${companyId}`).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))
  }
  addProfilePic(requestBody: any) {

    const formData1 = new FormData();
    formData1.append('formFile', requestBody.formFile, requestBody.formFile.name)
    formData1.append('employeePersonalDetailId', requestBody.employeePersonalDetailId)
    formData1.append('employeeImageUrl', requestBody.employeeImageUrl)
    formData1.append('email', requestBody.email)

    return this.http.post(`/api/EmployeePersonalDetails/UploadProfile`, formData1).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))
  }
  addLogo(requestBody: any) {

    const formData = new FormData();
    formData.append('formFile', requestBody.fromFile, requestBody.fromFile.name)
    formData.append('companyId', requestBody.companyId)
    formData.append('isCompanyLogo', requestBody.isCompanyLogo)
    return this.http.post(`/api/Organisations/UploadLogo`, formData).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }
  addProfile(requestBody: FormData) {

    return this.http.post(`/api/EmployeePersonalDetails/UploadProfile`, requestBody).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))

  }

  deleteLogo(req: any) {
    return this.http.delete(`/api/Organisations/RemoveLogo/${req.companyId}/${req.isCompanyLogo}`).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))
  }
  //localhost:44364/api/EmployeePersonalDetails/GetEmpDetails/2
  getProfilePic(empId: any) {
    return this.http.get(`/api/EmployeePersonalDetails/GetEmpDetails/${empId}`).pipe(map((res: any) => {
      console.log(res)
      return res;
    }, (error: any) => {
      console.log(error)
      return error;
    }))
  }
  deleteProfilePic(req: any) {
    return this.http.delete(`/api/EmployeePersonalDetails/RemoveProfile/${req}`).pipe(map((res: any) => {
      return res;
    }, (error: any) => {
      return error;
    }))
  }

  createTempuser(data:any) {
    return this.http.post(`/api/TempUsers/PostTempUsers`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //UserList get api call

  gettempuserList(companyId:any) {
    return this.http.get(`/api/TempUsers/GetTempUsers/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


  //Edit Temp User
  editTempuser(data: any,tempUserId: any) {
    return this.http
      .post(`/api/TempUsers/PostTempUsers/${tempUserId}`,data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updatetempUser(requestBody: any) {
    return this.http.post(`/api/TempUsers/PostTempUsers/`,requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Disable Temp User
  disableTempuser(tempUserId: any): Observable<any> {
    return this.http.put(`/api/TempUsers/ChangeTempUserStatus/${tempUserId}`,{}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Unable Tempuser
  enableTempUser(tempUserId: any) {
    return this.http.put(`/api/TempUsers/ChangeTempUserStatus/${tempUserId}`, {}).pipe(
      (res: any) => {
        return res;
      }, (error: any) => {
        return error;
      }
    );
  }
  validateDisabletempUser(tempUserId: any) {
    return this.http.get(`/api/TempUsers/GetTempUsers/${tempUserId}`, {}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
       //post call for Emp Code Creation
       createempCode(data: any) {
        return this.http.post(`/api/EmployeePersonalDetails`, data).pipe(
          map((res: any) => {
            return res;
          })
        );
      }

        //Emp Code  get api call

    getempCode() {
      return this.http.get(`/api/EmployeePersonalDetails?getAll=true`).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
    editempCode(data: any, EmployeeId: string) {
      return this.http
        .put(`/api/EmployeePersonalDetails/${EmployeeId}`, data)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    disableempCode(EmployeeId: any) {
      return this.http.put(`/api/EmployeePersonalDetails/DisableUser/${EmployeeId}`, {}).pipe(
        map((res: any) => {
          return res;
        })
      );
    }
}
