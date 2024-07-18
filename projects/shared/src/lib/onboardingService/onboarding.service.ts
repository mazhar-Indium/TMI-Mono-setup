import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyKindOfDictionary } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CredentialsService } from '../core/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  disableEmail: any;
  empPermissions: any;
  companyTabAllData: any;
  companyInfoData: any;
  userInfoData: any;
  accountInfoData: any;
  UserId:any;
  moduleMappingData: any;
  status: any
  approvePermission: boolean = false;
  updatePermission: boolean = false;
  createPermission: boolean = false;
  readPermission: boolean = false;
  companyIdUsed: any;
  constructor(private http: HttpClient,
    private credentialsService: CredentialsService,) {
     
    }

  public employeePermission = new BehaviorSubject<any>("Default Data")
  public clientEmployeePermission =this.employeePermission.asObservable();
 
  sendEmployeePermission(data:any){
    this.employeePermission.next(data);
  }

  // sendCompanyData(data:any){
  //   this.companyRequestBody.next(data);
  // }

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

  // Create New Course
  getClientCompanyList() {
    return this.http.get(`/api/ClientCreations/GetClientCompanyList`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getApprovedClientList(EmployeeId: any) {
    //return this.http.get(`/api/ClientCreations?getALL=true`).pipe(
      return this.http.get(`/api/ClientCreations/ClientCreations/${EmployeeId}?getALL=true`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //post api to create the client company Onboarding...
  saveClientCompanyOnboarding(data: any) {
    return this.http
      .post(`/api/ClientCreations/ClientCompanyOnboarding`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //edit api to update client company onboarding...
  editClientCompanyOnboarding(requestBody: any, companyId: any) {
    return this.http
      .put(
        `/api/ClientCreations/UpdateClientCompanyOnboarding/${companyId}`,
        requestBody
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //edit api to update client company onboarding...
  disableClientCompanyOnboarding(requestBody: any, clientId: any, status: any) {
    return this.http
      .put(
        `/api/ClientCreations/ChangeClientStatus/${clientId}/${status}`,
        requestBody
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getMakesAndCheckersList() {
    return this.http
      .get(`/api/EmployeePersonalDetails/GetUsersByRoleId/2 `)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // GETS the company info
  getCompanyInfo(companyId: any) {
    return this.http.get(`/api/Organisations/DuplicateOrganisation/${companyId}`).pipe(
    //return this.http.get(`/api/Organisations/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getCompanyInfoByIdDuplicate(companyId: any) {
    return this.http.get(`/api/Organisations/DuplicateOrganisation/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getCompanyListforCompanyId(id: any) {
    //console.log('sent id', id);
    return (
      this.http
        .get(`/api/Organisations?GetAll=true`)
        // .get(`/api/Organisations/GetRelatedCompaniesForCompanyId/${id}`)
        .pipe(
          //return this.http.get(`/api/Organisations/${id}`).pipe(
          map((res: any) => {
            //console.log('company client list', res);
            return res;
          })
        )
    );
  }

  // getClientListById(id: any) {
  //   //console.log('sent id', id);
  //   return this.http.get(`/api/ClientCreations/${id}`).pipe(
  //     //return this.http.get(`/api/Organisations/${id}`).pipe(
  //     map((res: any) => {
  //       //console.log('company client list', res);
  //       return res;
  //     })
  //   );
  // }

  // GETS the user info
  getUserInfo(companyId: any) {
    console.log('in service comapany',companyId);
    return this.http
      .get(
        `/api/EmployeePersonalDetails/GetDefaultAdmin/${companyId}?isClient=false`
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // GETS the module list
  getModuleList() {
    return this.http.get(`/api/Modules`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // GETS the modules assigned to specific company
  getAssignedModules(companyId: any) {
    return this.http
      .get(`/api/Modules/GetModulesForCompanyId/${companyId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  submitCompanyInfo(requestBody: any) {
    return this.http.post(`/api/Organisations/DuplicatePostOrganisation`, requestBody).pipe(
    //return this.http.post(`/api/Organisations`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  submitUserInfo(requestBody: any, companyId: any) {
    return this.http
      .post(
        `/api/EmployeePersonalDetails/CreateCompanyAdmin/${companyId}`,
        requestBody
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  updateCompanyUserInfo(data: any, id: any) {
    return this.http.put(`/api/EmployeePersonalDetails/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  saveModuleMapping(data: any) {
    return this.http.post(`/api/ModuleOrganisationMappers`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  approveModuleMapping(rejectReason: any, companyId: any, status: string) {
    return this.http
      .put(
        `/api/Organisations/ChangeOrganisationStatus/${companyId}/${status}?RejectionReason=${rejectReason}`,
        ''
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // GETS the client list
  getClientListId(EmployeeId:any) {
    return this.http.get(`/api/ClientCreations/ClientCreations/${EmployeeId}?getALL=false`).pipe(
      map((res: any) => {
        //console.log('client list', res);
        return res;
      })
    );
  }

  getCompanyList(EmployeeId: any) {

    return this.http.get(`/api/Organisations/Organisations/${EmployeeId}?GetAll=false`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING Client ******
   * @param data have data to edit CLIENT
   * @param ClientId have id for applying edit
   * **/
  editClientCreated(data: any, ClientId: string) {
    return this.http.put(`/api/ClientCreations/${ClientId}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Api Call to get Client Created List(View).
  getClientCreationList(employeeId:any) {
    return this.http.get(`/api/ClientCreations/ClientCreations/${employeeId}?getALL=false`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  //Api Call to get Client Created List(View) based on Id.
  getClientCreationListId(clientId: any) {
    // //console.log(clientId, 'IID');

    return this.http
      .get(
        `/api/EmployeePersonalDetails/GetDefaultAdmin/${clientId}?isClient=true`
      )
      .pipe(
        map((res: any) => {
          //console.log(res, 'resp EDITTTT');

          return res;
        })
      );
  }

  //Api Call to get Client Created List(View) based on Id FROM CLIENT LIST.
  getClientCreationListIds(clientId: any) {
    // //console.log(clientId, 'IID');

    return this.http.get(`/api/ClientCreations/${clientId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  //Api call for Post User Info
  createUserInfo(data: any, id: any) {
    return this.http
      .post(`/api/EmployeePersonalDetails/CreateCompanyAdmin/${id}`, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  //Api call for Edit User Info
  editUserInfo(data: any, id: any) {
    return this.http.put(`/api/EmployeePersonalDetails/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  /***API CALL FOR EDITING Client ******
   * @param data have data to edit CLIENT
   * @param ClientId have id for applying edit
   * **/
  editUserCreated(data: any, ClientId: string, Status: any, reason: any) {
    return this.http
      .put(
        `/api/ClientCreations/ChangeClientStatus/${ClientId}/${Status}?RejectionReason=${reason}`,
        data
      )
      .pipe(  
        map((res: any) => {
          return res;
        })
      );
  }

  //get api for Employee Personal Details with ID api
  getEmployeeListId(id: any) {
    //console.log(id, 'IID');

    return this.http.get(`/api/EmployeePersonalDetails/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changeOrganizationStatus(
    data: any,
    CompanyId: string,
    Status: number,
    reason: any
  ) {
    return this.http
      .put(
        `/api/Organisations/ChangeOrganisationStatus/${CompanyId}/${Status}?RejectionReason=${reason}`,
        data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  // Get Pending Approvals
  getPendingApprovals(userId: number) {
    //docker.elixirhr.com/api/Organisations/GetConsolidatedPendingList/{UserId}
    https: return this.http
      .get(`/api/Organisations/GetConsolidatedPendingList/${userId}`)
      .pipe(
        // return this.http.get(`/api/Organisations/GetPendingList/${userId}`).pipe(
        map((res: any) => {
          return res;
        })
      );
  }


    /***API CALL FOR Approve or Reject Client ******
   * @param ClientId have id for applying edit
   * **/
     approveOrRejectClientCreation(ClientId: string, Status: any, reason: any) {
      return this.http
        .put(
          `/api/ClientCreations/ChangeClientStatus/${ClientId}/${Status}?RejectionReason=${reason}`,{}
        )
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    //API CALL FOR GET USERS IN ONBOARDING
    //https://test.dev.elixirhr.com/api/EmployeePersonalDetails/GetTMIUsers
    getUsersList() {
      https: return this.http
        .get(`/api/EmployeePersonalDetails/GetTMIUsers`)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    getUsersForEmpId(clientId:any) {
      https: return this.http
        .get(`/api/ClientCreations/GetExistingClientUserDetails/ClientId?ClientId=${clientId}`)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }


    //API CALL FOR GET CLIENT/COMPANY ONAORDING LIST

    getOnboardingList(CompanyId: any) {
      https: return this.http
        .get(`/api/ClientCreations/GetClientCompanyOnboardingList`)
        .pipe(
          // return this.http.get(`/api/Organisations/GetPendingList/${userId}`).pipe(
          map((res: any) => {
            return res;
          })
        );
    }

   //GET COMPANY USER
    getCompanyUser(CompanyId: any) {
      https: return this.http
        .get(`/api/ClientCreations/GetCompanyUsers/CompanyId?CompanyId=${CompanyId}`)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    //GET CLIENT USER
    getClientUser(ClientId: any) {
      https: return this.http
        .get(`/api/ClientCreations/GetClientUsers/ClientId?ClientId=${ClientId}`)
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

     //DISABLE COMPANY
    disableCompanyUser(CompanyId: any){
      return this.http
        .put(`/api/ClientCreations/DisableCompanyOnboarding/${CompanyId}`,{})
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    //ENABLE COMPANY
    enableCompanyUser(companyId: any){
      return this.http
        .put(`/api/ClientCreations/EnableCompanyOnboarding/${companyId}`,{})
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    //DISABLE CLIENT
    disableClientUser(ClientId: any){
      return this.http
        .put(`/api/ClientCreations/DisableClientOnboarding/${ClientId}`,{})
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    enableClient(ClientId: any){
      return this.http
        .put(`/api/ClientCreations/EnableClientOnboarding/${ClientId}`,{})
        .pipe(
          map((res: any) => {
            return res;
          })
        );
    }

    //update client compny users
    updateClientCoompanyUser(data:any){
     return this.http
      .put(`/api/ClientCreations/UpdateClientCompanyOnboarding`,data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    //Get Data Related To Roles
    getUserRoles(CompanyId: any){
     return this.http
      .get(`/api/ClientCreations/GetClientCompanyOnboarding/${CompanyId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
    }

    //get all users mapped to client or company for sending mail
    getUserDetailsForSendingMail(isClient: boolean,Id: any){
      return this.http
       .get(`/api/EmployeePersonalDetails/GetUsersMappedWithClientOrCompany/${isClient}/${Id}`)
       .pipe(
         map((res: any) => {
           return res;
         })
       );
     }

  //get checked Module For Company Module Mapping
  getCheckedModule(companyId: any){
    return this.http
    .get(`/api/ModuleOrganisationMappers/GetModuleOrganisationMappers/${companyId}`)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
//Checking for save button permiision
/************************************************************************************ */
saveCompanyTab(){
  this.empPermissionValues();
  let testSaveArr = [(!this.approvePermission && !this.readPermission && this.updatePermission && this.createPermission),
    (!this.approvePermission && this.readPermission && this.updatePermission && this.createPermission),
    (!this.approvePermission && !this.readPermission && !this.updatePermission && this.createPermission),
    (this.readPermission && this.updatePermission && this.createPermission && this.status == 'new'),
    (this.readPermission && !this.updatePermission && this.createPermission && this.status == 'new'),
    (!this.readPermission && this.updatePermission && this.createPermission && this.status == 'new')
    ];
  console.log('save button permission',testSaveArr.some((element:any) => element === true));
  console.log('CREATE',this.createPermission);
  console.log('APPROVE',this.approvePermission);
  console.log('READ',this.readPermission);
  console.log('UPDATE',this.updatePermission);
  console.log('STATUS',this.status);
  return testSaveArr.some((element:any) => element === true) 
}

approveCompanyTab(){
  this.empPermissionValues();
  let testApproveArr = [(this.approvePermission && !this.updatePermission && !this.readPermission && !this.createPermission && this.status == 'EDIT'),
  (this.approvePermission && !this.updatePermission && this.readPermission && !this.createPermission && this.status == 'EDIT'),
  ]
  console.log('approve button permission',testApproveArr.some((element:any) => element === true), this.status, this.createPermission,this.updatePermission);
 return testApproveArr.some((element:any) => element === true);
}

/*************************************************************************8 */
  saveButton(){
    this.empPermissionValues();
    let testSaveArr = [(!this.approvePermission && !this.readPermission && this.updatePermission && this.createPermission),
      (!this.approvePermission && this.readPermission && this.updatePermission && this.createPermission),
      (!this.approvePermission && this.readPermission && this.updatePermission && this.createPermission),
      (!this.approvePermission && !this.readPermission && !this.updatePermission && this.createPermission),
      (this.approvePermission && this.readPermission && this.updatePermission && this.createPermission && this.status == 'new'),
      (this.approvePermission && this.readPermission && !this.updatePermission && this.createPermission && this.status == 'new'),
      (this.approvePermission && !this.readPermission && !this.updatePermission && this.createPermission && this.status == 'new')
      ];
    console.log('save button permission',testSaveArr.some((element:any) => element === true));
    console.log('CREATE',this.createPermission);
    console.log('APPROVE',this.approvePermission);
    console.log('READ',this.readPermission);
    console.log('UPDATE',this.updatePermission);
    console.log('STATUS',this.status);
    return testSaveArr.some((element:any) => element === true);
  }

  empPermissionValues(){
    // let data = this.clientEmployeePermission.subscribe((x:any)=>{
    //   console.log("DATATATATA", x.EmployeePermission)
    //   alert('Data'+x.EmployeePermission);
    // })
    this.clientEmployeePermission.subscribe((x:any) =>{ 
      //alert(JSON.stringify(x.employeePermission));
      let empPerm = x.employeePermission;
      this.createPermission = empPerm.create;
      this.updatePermission = empPerm.update;
      this.readPermission = empPerm.read;
      this.approvePermission = empPerm.approve;
    
    });
    if (this.approvePermission && this.updatePermission) {
      this.approvePermission = true;
      this.updatePermission = false;
    }
  }
//check for approve button permission
approveButton(){
  this.empPermissionValues();
  let testApproveArr = [(this.approvePermission && !this.updatePermission && !this.readPermission && !this.createPermission && this.status == 'EDIT'),
  (this.approvePermission && !this.updatePermission && this.readPermission && !this.createPermission && this.status == 'EDIT'),
  (this.approvePermission && !this.updatePermission && this.readPermission && this.createPermission && this.status == 'EDIT'),
  (this.approvePermission && this.updatePermission && this.readPermission && this.createPermission && this.status == 'EDIT')
  ]
  console.log('approve button permission',testApproveArr.some((element:any) => element === true), this.status, this.createPermission,this.updatePermission);
 return testApproveArr.some((element:any) => element === true);
}


//Get Master Settings
//https://test.dev.elixirhr.com/api/Organisations/GetMastersList
getMasterSettings(id:any){
  return this.http
  .get(`/api/Organisations/GetMastersList/${id}`)
  .pipe(
    map((res: any) => {
      return res;
    })
  );
}
setMastersSettings(id:any,data: any){
  console.log('master data is',data);
    return this.http
      .post(
        `/api/Organisations/MastersPermissions/${id}`,data
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
}  
}

