import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
// import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedService, NgDialogAnimationService, AclService, CredentialsService } from '../../../../../shared/src/public-api';
import { DeleteConfirmationComponent } from '../../../../../shell/src/app/common-structure/delete-confirmation/delete-confirmation.component';


// import FileSaver  from 'file-saver';

export interface DialogData {
  Company: any,
  Logo: any,
  empId: any,
  empEmailId: any
}

@Component({
  selector: 'app-upload-profilepic',
  templateUrl: './upload-profilepic.component.html',
  styleUrls: ['./upload-profilepic.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class UploadProfilepicComponent implements OnInit {
  nullvalue: any = null;
  visible = false;
  imgName: any;
  heightandwidth:number = 150;



  constructor(
    public dialogRef: MatDialogRef<UploadProfilepicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public dialogEffect: NgDialogAnimationService,
    private aclService: AclService,
    private _sanitizer: DomSanitizer,
    public credService: CredentialsService
  ) { }



  ngOnInit(): void {
    this.companyId = this.credService?.credentials?.currentCompany?.companyId;
    console.log('in dialog', this.data);

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
  ImageError: string[] = [];
  Showerror: boolean = false;
  companyId: any ;
  logoPresent: boolean | undefined;
  companyLogo: any;
  editMode: boolean = false;
  showSuccess(responseMessage:any) {
    this.sharedService.toastMsg(responseMessage, 'success')
  }

  // image Cropper Starts Here ---------------------------------------
  onSelectFile(e: any) {

    this.ImageError = [];
    const filesize = 50000;
    const allowed_types = ['image/png', 'image/jpeg'];
    const png = 'image/png'
    const jpg = 'image/jpeg'
    const type = e.target.files[0].type
    this.fileChangeEvent(e)
    if (e.target.files) {
      console.log(e)
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      if (e.target.files[0].size > filesize) {
        this.ImageError.push("Maximum Size Allowed is 50KB");
        this.Showerror = true;
        console.log(this.ImageError)

      }
      if (!allowed_types.includes(type)) {
        this.ImageError.push('Only Images are allowed ( JPG | PNG )');
        this.Showerror = true
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
          this.Showerror = false;
        }

      }
    }
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imgName = event.target.files[0];
    console.log(event, this.imgName)
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
  getImageFile(base64: string): File {
    const sanitizedBase64 = this._sanitizer.bypassSecurityTrustResourceUrl(base64);
    const file = new Blob([base64], { type: 'image/png' });
    return file as File;
  }

  saveBase64ToImage(base64String: string, fileName: string, mode: number) {
    // const blob = new Blob([base64String], { type: this.imgName.type });
    // const file = new File([blob], fileName, { type: this.imgName.type });

    // console.log(this.imgName);
    // let fileReader = new FileReader();
    // fileReader.readAsDataURL(file);
    // console.log(fileReader)
    if (mode == 1) {
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/png;base64,', '');
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/jpg;base64,', '');
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/jpeg;base64,', '');
      const byteArray = new Uint8Array(atob(this.croppedImage.base64).split('').map((char) => char.charCodeAt(0)));

      const file1 = new Blob([byteArray], { type: this.imgName.type });
      const file = new File([file1], fileName, { type: this.imgName.type });
      console.log('file is',file);
      return file;
    }
    else if (mode == 2) {
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/png;base64,', '');
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/jpg;base64,', '');
      this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/jpeg;base64,', '');
      const byteArray = new Uint8Array(atob(this.croppedImage.base64).split('').map((char) => char.charCodeAt(0)));

      const file1 = new Blob([byteArray], { type: "image/png" });
      const file = new File([file1], fileName, { type: "image/png" });
      console.log(file);
      return file;
    }
    else {
      return;
    }


  }
  // image Cropper Ends Here ---------------------------------------
  getCompanyLogo() {
    this.aclService.getLogo(this.companyId).subscribe((res: any) => {
      this.logoPresent = res.isCompanyLogo;
      this.companyLogo = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
        + res[0].img);
      console.log(this.companyLogo, 'i am image')
    });
  }


  upload() {

    if (!this.editMode) {
      let newimage: any = this.saveBase64ToImage(this.croppedImage.base64, this.imgName.name, 1);
      if (this.croppedImage != null) {
        console.log('crpped image', this.croppedImage)
        // this.data.imageurl = this.loadedImage;
        this.data.Logo = this.croppedImage.base64;
        let file = this.getImageFile(this.croppedImage);
        let requestBody = {
          formFile: newimage,
          employeePersonalDetailId: this.data.empId,
          employeeImageUrl: "null",
          email:this.data.empEmailId
          
        }
        const formData1: FormData = new FormData();
        formData1.append('formFile', this.imgName, this.imgName.name)
        formData1.append('employeePersonalDetailId', requestBody.employeePersonalDetailId)
        formData1.append('employeeImageUrl', requestBody.employeeImageUrl)
        formData1.append('email', requestBody.email)

        console.log(requestBody)


        console.log(formData1)

        this.aclService.addProfilePic( requestBody).subscribe((res: any) => {
          console.log('upload image response', res)
          this.companyId = res.companyId;
          this.showSuccess(res.message)
        }) 
        this.dialogRef.close(this.data);
        this.getCompanyLogo()

      }
      else {
        // this.showSuccess()
        this.dialogRef.close(this.data)

      }

    }
    else {
      let newimage: any = this.saveBase64ToImage(this.croppedImage.base64, "hello.png", 2);
      if (this.croppedImage != null) {
        console.log('crpped image', this.croppedImage)
        // this.data.imageurl = this.loadedImage;
        this.data.Logo = this.croppedImage.base64;
        let file = this.getImageFile(this.croppedImage);
        let requestBody = {
          formFile: newimage,
          employeePersonalDetailId: this.data.empId,
          employeeImageUrl: "null",
          email:this.data.empEmailId
        }
        const formData1: FormData = new FormData();
        formData1.append('formFile', requestBody.formFile, requestBody.formFile.name)
        formData1.append('employeePersonalDetailId', requestBody.employeePersonalDetailId)
        formData1.append('employeeImageUrl', requestBody.employeeImageUrl)

        this.aclService.addProfilePic(requestBody).subscribe((res: any) => {
          console.log('upload image response', res)
          this.companyId = res.companyId;
          this.showSuccess(res.message)
        })
     
        this.dialogRef.close(this.data);
        this.getCompanyLogo()

      }
      else {
        // this.showSuccess()
        this.dialogRef.close(this.data)

      }

    }
    // this.downloadfile();

  }

  downloadfile() {
    this.croppedImage.base64 = this.croppedImage.base64.replace('data:image/png;base64,', '');
    const byteArray = new Uint8Array(atob(this.croppedImage.base64).split('').map((char) => char.charCodeAt(0)));

    const file1 = new Blob([byteArray], { type: this.imgName.type });
    // FileSaver.saveAs(file1, this.imgName.name);

  }

  onEdit(e: any) {
    console.log(e);
    this.editMode = true;
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

    this.aclService.deleteProfilePic(this.data.empId).subscribe((res: any) => {
      console.log('delete image response', res)
    })
    this.dialogRef.close(this.data);
  }

  //Logo delete Confirmation------------------------
  disableConfirmation(element: any, action: number, actionString: string) {
    console.log('image data', element);
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
        if (val === true) {
          this.data.Logo = this.nullvalue;
          this.onDelete()
        }
      })
  }
}