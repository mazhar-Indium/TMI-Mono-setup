import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './menu';
import { SuperAdminMenuItem } from './superAdminMenu';
import { TmiAdminMenuItem } from './tmiAdminMenu';
import { CredentialsService, NgDialogAnimationService } from '../../../../../shared/src/public-api';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  MenuItems?: MenuItem = new MenuItem();
  tmiAdminMenuItems?: TmiAdminMenuItem = new TmiAdminMenuItem();
  superAdminMenuItems?: SuperAdminMenuItem = new SuperAdminMenuItem();
  userType: string = '';
  menuList: any = [];
  masterMenu: any;
  isCompanyAdmin: Boolean = false;
  encodedUrl: string;
  beUrl:string = 'salary-master/'

  constructor(private router: Router, private credService: CredentialsService, public dialog: MatDialog, public dialogEffect: NgDialogAnimationService,) {
    // this.encodedUrl = encodeURIComponent('https://www.w3schools.com');
    // this.encodedUrl = encodeURIComponent('http://localhost:5000/acl/module-management/Access%20Control/Module%20Enabling%20');
    this.encodedUrl = encodeURIComponent('https://reportvisualization.development.elixirhr.com/report');
    // this.encodedUrl = encodeURIComponent('https://www.youtube.com/watch?v=k9RYmSO0wvc&ab_channel=Let%27sProgram');
    // this.encodedUrl = encodeURIComponent('https://chatgpt.com/');
    // this.encodedUrl = encodeURIComponent('https://www.wikipedia.org/');
    this.userType = this.credService.getUserType();
    console.log('user type is',this.userType)
  }
  navigateToSalaryMaster() {
    this.router.navigate(['/master/salary-master', this.encodedUrl]);
  }
  ngOnInit(): void {
    this.isCompanyAdmin = this.credService?.credentials?.currentCompany?.isCompanyAdmin;
    this.masterMenu =  [];
    // this.masterMenu =  Object.keys(masters.masters).map((e:any)=> masters.masters[e]);
    // alert('...')
    this.getMenuList();
    // console.log('masters list',this.masterMenu[0],this.masterMenu[0].SubModule[4].Screens.length)
  }

  activeItem: any; // Variable to store the active item

  // Function to set the active item
  setActiveItem(item: any) {
    this.activeItem = item;
  }

  // Function to check if an item is active
  isActiveItem(item: any): boolean {
    return this.activeItem === item;
  }
  navigateToModule(link: any,screen:any, moduleName: any) {
   console.log('link: ', link,screen, moduleName);
   this.router.navigate([link, moduleName, screen]);
  }

  getMenuList() {
    this.menuList =
      this.credService.credentials?.currentCompany.AccessControls.filter(
        (item: any) => {
          console.log('item',item);
          return item.moduleName;
        }
      );
    console.log('this.menuList: ', JSON.stringify(this.menuList));
    let x = JSON.stringify(this.menuList)
    // alert(x)
  }
  addMasters(){}
//   addMasters(){
//     const dialogRef = this.dialogEffect.open(AddMastersComponent, {
//     height: '500px',
//     width: '2500px',
//     position: 'center',
//     animation: { to: 'center' },
//     disableClose: true,
//     panelClass: 'my-dialog',
     
//     });
//     dialogRef.afterClosed().subscribe((result: any) => {
//     dialogRef.afterClosed().subscribe(result => {
//     })
// });

//   }
  
  addSiblings(){}
  // addSiblings(){
  //   const dialogRef = this.dialogEffect.open(AddSiblingsComponent, {
  //     height: '800px',
  //     width: '2800px',
  //     position: 'center',
  //     animation: { to: 'center' },
  //     disableClose: true,
  //     panelClass: 'my-dialog',
       
  //     });
  //     dialogRef.afterClosed().subscribe((result: any) => {
  //     dialogRef.afterClosed().subscribe(result => {
  //     })
  // });
  
  // }
}