import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface Credentials {
  // Customize received credentials here
  accessControl: any;
  emailId: string;
  employeeId: number;
  guidId: string;
  token: string;
  isFirstLogin: boolean;
  isPasswordExpired: boolean;
  isOwnerCompany: boolean;
  refreshToken: any;
  userName: string;
  validity: string;
  currentCompany: any;
}

const credentialsKey = 'tmi-credentials';
const permissionKey = 'screenPermissions';
const superAdminpermissionKey = 'superAdminPermissions';
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  [x: string]: any;
  private _credentials: Credentials | null = null;
  private screenPermissions: any | null = null;
  private superAdminPermissions: any | null = null;

  constructor(private router: Router) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    const screenPermissions = localStorage.getItem(permissionKey);
    if(screenPermissions){
      this.screenPermissions = JSON.parse(screenPermissions);
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  //superadmin approval permission
  setSuperAdminPermissions(superpermissions: any){
    if (superpermissions === null) {
      localStorage.removeItem(superAdminpermissionKey);
    } else {
      this.superAdminPermissions = superpermissions;
      localStorage.setItem(superAdminpermissionKey,JSON.stringify(superpermissions));
      console.log('permissions',superpermissions);
    }
  }

   // Get Permissions From Credentials Service
   getSuperAdminPermissions(){
    this.superAdminPermissions = localStorage.getItem(superAdminpermissionKey);
    console.log("SuperAdmin Permission => ", this.superAdminPermissions);
    console.log("JSON.parse(this.SuperAdminPermission) in Get Permissions=> ", JSON.parse(this.superAdminPermissions));
    return JSON.parse(this.superAdminPermissions);
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

  // Save Permissions In Credentials Service
  setPermissions(permissionsList: any){
    this.screenPermissions = permissionsList;
    localStorage.setItem(permissionKey,JSON.stringify(permissionsList));
    console.log('permissions',permissionsList)
  }

  // Get Permissions From Credentials Service
  getPermissions(){
    if(this.router.url.includes('client-company-onboarding')){
      //alert('Get Permissions called from client-company-onboarding');
    }
    if(this.router.url.includes('client-list')){
      //alert('Get Permissions called from client-list');
    }
    if(this.router.url.includes('company-list')){
      //alert('Get Permissions called from company-list');
    }
    this.screenPermissions = localStorage.getItem(permissionKey);
    console.log("this.screenPermissions in Get Permissions => ", this.screenPermissions);
    console.log("JSON.parse(this.screenPermissions) in Get Permissions=> ", JSON.parse(this.screenPermissions));
    return JSON.parse(this.screenPermissions);
  }

  /**
   * Checks is the user is a admin user or  application user.
   * @return True if the user is admin.
   */
  getUserType(): string {
    console.log('this.credentials: ',this.credentials?.accessControl.EmployeeDetails.employeeRole);
    return this.credentials?.accessControl.EmployeeDetails.employeeRole;
  }

  getUserRoleList() {
    return this.credentials?.accessControl.EmployeeDetails.employeeRoleList;
  }
}
