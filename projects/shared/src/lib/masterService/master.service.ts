import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'projects/onboarding/src/environments/environment';
import { map } from 'rxjs';
import { CredentialsService } from '../core/credentials.service';
// import { CredentialsService } from '@shared';
@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private http: HttpClient,
    private credService: CredentialsService
  ) { }

  // createMaster(tenantId: any,requestBody: any) {
  //   return this.http.post(`${environment.masterUrl}/api/Masters/PostMaster/${tenantId}`, requestBody).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  // updateMaster(tenantId: any, masterId: any, requestBody: any) {
  //   return this.http.put(`${environment.masterUrl}/api/Masters/PutMaster/${tenantId}/${masterId}`, requestBody).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  //Api calls related to Course
  // getMastersList(tenantId: any, companyId: any) {
  //   return this.http.get(`${environment.masterUrl}/api/Masters/GetMasters/${tenantId}/${companyId}`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   )
  // }

  // getMasterChildrenList(tenantId: any, companyId: any, masterName: any){
  //   return this.http.get(`${environment.masterUrl}/api/Masters/GetMasterChildren/${tenantId}/${masterName}/${companyId}`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   )
  // }

  //Api calls related to Course
  // getMastersOrder(tenantId: any, companyId: any) {
  //   return this.http.get(`${environment.masterUrl}/api/Masters/GetMasterOrders/${tenantId}/${companyId}`).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   )
  // }

  /***API CALL FOR EDITING & DISABLING Master ******
   * @param requestBody have data to edit or disable Master
   * @param id have id for applying edit or disable option
   * **/
  // editMaster(tenantId: any, id: any, requestBody: any) {
  //   return this.http.put(`${environment.masterUrl}/api/Masters/PutMaster/${tenantId}/${id}`, requestBody).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  /***API CALL FOR Change In Master Order ******
   * @param requestBody have data to edit or disable Master
   * @param companyId have id for applying edit or disable option
   * @param tenantId have id for applying edit or disable option
   * **/
  // changeOrderRequest(tenantId: any, companyId: any, requestBody: any) {
  //   return this.http.put(`${environment.masterUrl}/api/Masters/ChangeMasterOrderRequest/${tenantId}/${companyId}`, requestBody).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  // changeOrderApprove(tenantId: any, companyId: any, requestBody: any) {
  //   return this.http.put(`${environment.masterUrl}/api/Masters/ChangeMasterOrderApprove/${tenantId}/${companyId}`, requestBody).pipe(
  //     map((res: any) => {
  //       return res;
  //     })
  //   );
  // }

  PostMasterChangesTracker(requestBody: any) {
    return this.http.post(`/api/MasterChangesTrackers`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  async promiseMasterChangesTracker(requestBody: any){
    return await this.http.post(`/api/MasterChangesTrackers`, requestBody).toPromise().then((response: any) => {return response});
  }

  PutMasterChangesTracker(NotificationId: any, requestBody: any) {
    return this.http.put(`/api/MasterChangesTrackers/${NotificationId}`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  generateRequestBodyForTracker(action: string, masterDetails: any, cId: any){
    let requestBody = {};
    if(action === 'POST'){
      requestBody = {
        companyId: cId,
        userId: this.credService.credentials?.employeeId,
        status: 2,
        createdBy: this.credService.credentials?.emailId,
        updatedBy: this.credService.credentials?.emailId,
        masterName: masterDetails.masterAttributeName,
        isOrderChange: false
      }
    }
    if(action === 'PUT'){
      requestBody = {
        companyId: cId,
        userId: this.credService.credentials?.employeeId,
        status: masterDetails.Status,
        createdBy: this.credService.credentials?.emailId,
        updatedBy: this.credService.credentials?.emailId,
        masterName: masterDetails.masterAttributeName,
        isOrderChange: false
      }
    }
    if(action === 'DISABLE'){
      requestBody = {
        companyId: cId,
        userId: this.credService.credentials?.employeeId,
        status: 4,
        createdBy: this.credService.credentials?.emailId,
        updatedBy: this.credService.credentials?.emailId,
        masterName: masterDetails.Name,
        isOrderChange: false
      }
    }
    if(action === 'ENABLE'){
      requestBody = {
        companyId: cId,
        userId: this.credService.credentials?.employeeId,
        status: 1,
        createdBy: this.credService.credentials?.emailId,
        updatedBy: this.credService.credentials?.emailId,
        masterName: masterDetails.Name,
        isOrderChange: false
      }
    }
    return requestBody;
  }
  getAllMasters(companyId: number){
    //
    return this.http.get(`/api/Organisations/GetStaticMastersList/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  addSiblings(companyId:any,requestBody:any){
    //api/Organisations/SelectedMastersList/782
    return this.http.post(`/api/Organisations/SelectedMastersList/${companyId}`, requestBody).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getSiblings(companyId:any){
    //api/Organisations/SelectedMastersList/782
    return this.http.get(`/api/Organisations/GetIncludeMastersList/${companyId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
