import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CredentialsService } from '../../../../shared/src/lib/core/credentials.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthenticationService } from '../../../../shared/src/lib/core/authentication.service';
import { AclService } from '../../../../shared/src/lib/aclService/acl.service';
import { NgDialogAnimationService } from '../../../../shared/src/lib/dialog-action/dialog.service';
import { LoaderService } from '../../../../shared/src/lib/core/loader.service';
import { catchError, forkJoin } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  collapsed: boolean = true;
  userData: any;
  companyId: any;
  companyName: any;
  isOwnerCompany: any;
  isCompanyLogo!: Boolean;
  logoPresent: boolean = false;
  isCompanyAdmin!: Boolean;
  isClientAdmin!: Boolean;
  userRole: any;
  companyLogo: any = null;
  companyList: any = [];
  selectedCompany: any;
  userType: string = '';
  aclList: any = [];
  userRoleList: any[] = [];
  userRoleString: string = '';
  @Inject(MAT_DIALOG_DATA) public data: any;

  profilepic: any = null;
  empId: any;
  profilepicbase64: any = null;
  empEmailId: any;
  data1: any;

  constructor(
    private router: Router,
    private titleService: Title,
    // private media: MediaObserver,
    public credService: CredentialsService,
    public overlayContainer: OverlayContainer,
    private authService: AuthenticationService,
    private aclService: AclService,
    public dialog: MatDialog,
    public dialogEffect: NgDialogAnimationService,
    public loaderService: LoaderService,
    private _sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    if (this.credService?.credentials) {
      this.companyId = this.credService.credentials.currentCompany?.companyId;
      this.companyName = this.credService.credentials.currentCompany?.companyName;
      this.isOwnerCompany = this.credService.credentials.isOwnerCompany;
      this.isCompanyLogo = this.credService.credentials.currentCompany?.companyLogo;
      this.isCompanyAdmin = this.credService.credentials.currentCompany?.isCompanyAdmin;
      this.isClientAdmin = this.credService.credentials.currentCompany?.isClientAdmin;
      this.userRole = this.credService.credentials.accessControl?.EmployeeDetails?.employeeRole;
      this.empId = this.credService.credentials.employeeId;
      this.empEmailId = this.credService.credentials.emailId;
      this.userData = this.credService.credentials;
      this.companyList = this.credService.credentials?.accessControl.CompanyDetails.Companies;
      this.selectedCompany = this.credService.credentials?.currentCompany.companyId;
      this.userType = this.credService.getUserType();
      this.userRoleList = this.credService.getUserRoleList();

      this.getprofilepic();
      const logo$ = this.aclService.getLogo(this.companyId);
      let Profilepic$ = this.aclService.getProfilePic(this.empId);

      const ForkJoinObservable$ = forkJoin([Profilepic$, logo$]).pipe(
        catchError((error) => {
          this.logoPresent = false;
          this.companyLogo = null;
          console.log(error)
          throw new Error("URL Issue")
        })
      );

      // ForkJoinObservable$.subscribe(([res, res2]) => {
      //   if (res2) {
      //     this.profilepic = res2.img;
      //     this.logoPresent = res2.isCompanyLogo;
      //     this.companyLogo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + res.img);
      //     this.companyLogo = res2.companyLogo;
      //   }
      // });
 this.aclList = this.credService.credentials?.currentCompany?.AccessControls[0].Screens;
      console.log('this.aclList: ', this.aclList);
      this.onSetTheme('light-theme');

      if (this.userRoleList?.length > 0) {
        this.userRoleList.forEach((role: any, i) => {
          this.userRoleString += ((i === 0 && this.userRoleList.length > 1) ? (role + ', ') : (i === (this.userRoleList.length - 1)) ? role : (role));
        });
      }
    }
  }

  ngAfterViewInit() { }

  openuploadprofilepic() { }

  name = 'World';
  callBack(name: string) {
    this.name = name;
  }

  getCompanyLogo() {
    const logo$ = this.aclService.getLogo(this.companyId);
    const ForkJoinObservable$ = forkJoin([logo$]).pipe(
      catchError((error) => {
        return "null";
      })
    );

    ForkJoinObservable$.subscribe(([res]) => {
      this.logoPresent = res.isCompanyLogo;
      this.companyLogo = 'data:image/jpg;base64,' + res.img;
    });
  }

  getprofilepic() {
    const Profilepic$ = this.aclService.getProfilePic(this.empId);
    const ForkJoinObservable$ = forkJoin([Profilepic$]).pipe(
      catchError((error) => {
        return "null";
      })
    );

    ForkJoinObservable$.subscribe(([res]) => {
      this.profilepic = res.img;
      this.profilepicbase64 = res.employeeImageUrl;
    });
  }

  openDialogForUploadImage(): void { }

  onSetTheme(theme: any) {
    this.overlayContainer.getContainerElement().classList.add(theme);
  }

  logOut() { }

  get username(): string | undefined {
    return this.credService.credentials?.userName;
  }

  isMobile: boolean = false;

  get title(): string {
    return this.titleService.getTitle();
  }

  openSettings(collapsed: boolean) {
    this.collapsed = !collapsed;
  }

  selectCompany(event: any) {
    this.selectedCompany = event?.value?.companyId;
    let new_credentials: any = this.credService.credentials;
    new_credentials.currentCompany = event?.value;
    new_credentials.accessControl.CompanyDetails.defaultCompanyId = event?.value?.companyId;
    new_credentials.accessControl.CompanyDetails.defaultCompanyName = event?.value?.companyName;
    this.credService.setCredentials(new_credentials);
    window.location.reload();
  }

  public objectComparisonFunction = function (
    option: any,
    value: any
  ): boolean {
    return option.companyId == value;
  };

  routeToDashboard() {
    let userType = this.credService.credentials?.accessControl.EmployeeDetails.EmployeeRole;
    if (userType == 'Super Admin') {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
