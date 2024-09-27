import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedService } from '../../../../../shared/src/lib/sharedService/shared.service';
import { NgDialogAnimationService, AclService, CredentialsService } from '../../../../../shared/src/public-api';
import { DeleteConfirmationComponent } from '../../../../../shell/src/app/common-structure/delete-confirmation/delete-confirmation.component';
// import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
export interface DialogData {
  Company: any,
  Logo: any
}
@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.scss'],
  animations: [
  trigger('slideInOut', [
      transition(':enter', [
      style({transform: 'translateY(-100%)'}),
      animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class UploadLogoComponent implements OnInit {
  nullvalue: any = null;
  visible = false;
  imgName: any;

  
  constructor(
    public dialogRef: MatDialogRef<UploadLogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public dialogEffect: NgDialogAnimationService,
    private aclService: AclService,
    private _sanitizer: DomSanitizer,
    public credService: CredentialsService
  ) { }
  ngOnInit(): void {
    this.companyId  = this.credService?.credentials?.currentCompany?.companyId;
    console.log('in dialog',this.data);
    //throw new Error('Method not implemented.');
  }
  showMessage() {
    this.visible = !this.visible;
  }


  url: any;
  dummyurl: any;
  originalimage: any;

  savethis: boolean = false;

  loadedImage: any;
  imageChangedEvent: any;
  croppedImage: any = null;
  ImageError:string[]=[];
  Showerror:boolean=false;
  companyId: any ;
  logoPresent: boolean|undefined;
  companyLogo: any;
  showSuccess() {
    this.sharedService.toastMsg('Image Uploaded Successfully','success')
  }

  // image Cropper Starts Here ---------------------------------------
  onSelectFile(e: any) {

    this.ImageError=[];
    const filesize = 50000;
    const allowed_types = ['image/png', 'image/jpeg'];
    const png = 'image/png'
    const jpg='image/jpeg'
    const type=e.target.files[0].type
    this.fileChangeEvent(e)
    if (e.target.files) {
      console.log(e)
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      if(e.target.files[0].size > filesize ){
        this.ImageError.push("Maximum Size Allowed is 50KB");
        this.Showerror=true;
        console.log(this.ImageError)
        
      }
      if (!allowed_types.includes(type)) {
        this.ImageError.push('Only Images are allowed ( JPG | PNG )');
        this.Showerror=true
        console.log(this.ImageError)
      }

      if (e.target.files[0].size < filesize && allowed_types.includes(type)) {
        
        reader.onload = (event: any) => {
          console.log(event)
          this.dummyurl = event.target.result;//Store selected File as image
          this.originalimage = this.data.Logo;// the image from Parent 
          this.imageChangedEvent = event.target.result;//Cropper Get Activated
          console.log(event.target.result)
          this.savethis = true;
          this.Showerror=false;
        }

      }
    }
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imgName = event.target.files[0];
    console.log(event,this.imgName)
  }

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = event//Cropped Image Will be saved
  //   // this.data.Logourl = this.croppedImage; // cropped image will be stored in data.logourl
  //   this.url = this.croppedImage;
  //   console.log(event);
  // }

  // imageLoaded(image: LoadedImage) {
  //   //this.loadedImage = image.original.base64//Selected Image will be loaded 
  //   //console.log(this.loadedImage)
  // }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

// image Cropper Ends Here ---------------------------------------
getCompanyLogo(){
  this.aclService.getLogo(this.companyId).subscribe((res: any) => {
    this.logoPresent = res.isCompanyLogo;
    this.companyLogo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
               + res.img);
               console.log('looooooooggggggoooo');
    console.log(this.companyLogo, 'i am image')
 });
}
  upload() {
    this.showSuccess()
    if (this.croppedImage != null) {
      console.log('crpped image',this.croppedImage)
      // this.data.imageurl = this.loadedImage;
      this.data.Logo = this.croppedImage;
      let requestBody = {
        companyId: this.data.Company,
        fromFile: this.imgName,
        isCompanyLogo: true
      }
      console.log('request body for image',requestBody);
      this.aclService.addLogo(requestBody).subscribe((res: any) => {
        console.log('upload image response',res)
        this.companyId= res.companyId;
      })
      this.dialogRef.close(this.data);
      this.getCompanyLogo()
    }
    else {
      this.dialogRef.close(this.data)
    }

  }

  onEdit(e: any) {
    console.log(e)
    this.imageChangedEvent = this.data.Logo;
    this.savethis = true;
    // let requestBody = {
    //   companyId: this.data.Company,
    //   fromFile: this.data.Logo
    // }
    // this.aclService.addLogo(requestBody).subscribe((res: any) => {
    //   console.log('edit image response',res)
    // })
    // this.imageChangedEvent = this.data.imageurl;//Cropper Get Activated
  }

  onDelete() {
    // this.data.imageurl = this.nullvalue;
    this.data.Logo = this.nullvalue;
    let requestBody = {
      companyId: this.data.Company,
      isCompanyLogo: false
    }
    this.aclService.deleteLogo(requestBody).subscribe((res: any) => {
      console.log('delete image response',res)
    })
    this.dialogRef.close(this.data);
  }

  //Logo delete Confirmation------------------------
  disableConfirmation(element: any, action: number, actionString: string) {
    console.log('image data',element);
    let dialogRef = this.dialogEffect
      .open(DeleteConfirmationComponent, {
        data: {
          action: actionString,
        },
        maxWidth: '600px',
        width: '80vw',
        disableClose: true,
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((val: any) => {
        if (val === true && action === 4 && actionString == 'delete') {
         this.onDelete()
          }
        })
  }
}