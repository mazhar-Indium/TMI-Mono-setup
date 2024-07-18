import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ToastComponent } from 'projects/shell/src/app/common-structure/toast/toast.component'; 
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TitleCasePipe } from '@angular/common';
import { ToastComponent } from '../../../../shell/src/app/toast/toast.component';
//import { ToastrService } from 'ngx-toastr';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  permissionsList: any;
  permissionData: any;

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}

  toastMsg(msg: string, type: string) {
    // msg = this.titlecasePipe.transform(msg);
    this._snackBar.openFromComponent(ToastComponent, {
      duration: 5 * 1000,
      data: {
        msg: msg,
        allowHtml: true
      },
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: `${type}-msg-cls`,
    });
  }

  checkShared(){
    
  }

  // toaster_Call(a:any,b:any,c:any){
  //   this.toast.success(a,b,c);
  // }
  downloadFile(data: any, filename: string, columns: any) {
    let csvData = this.ConvertToCSV(data, columns);
    //console.log(csvData);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + '';
      for (let index in headerList) {
        let head = headerList[index] === "Status" ? "StatusName" : headerList[index];
        if(head === "StatusName" && Object.keys(objArray[0]).includes('StatusName')){
          line += ',' + String(array[i][head]).charAt(0).toUpperCase() + String(array[i][head]).substr(1).toLowerCase()
        }
        else if(head === "StatusName" && Object.keys(objArray[0]).includes('Status')){
          line += ',' + String(array[i]["Status"]).charAt(0).toUpperCase() + String(array[i]["Status"]).substr(1).toLowerCase()
        }
        else{
          line += ',' + array[i][head];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   //console.log('worksheet', worksheet);
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ['data'],
  //   };
  //   const excelBuffer: any = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });
  //   //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], {
  //     type: EXCEL_TYPE,
  //   });
  //   FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  // }

  allowOnlyNumberKey(event: any) {
    var ASCIICode = event.which ? event.which : event.keyCode;
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
      return false;
    }
    return true;
  }

  sortByCreatedDate(res: any) {
    res.sort(function (a: any, b: any) {
      if (a.UpdatedDate > b.UpdatedDate) {
        return -1;
      } else if (a.UpdatedDate < b.UpdatedDate) {
        return 1;
      } else {
        return 0;
      }
    });
    return res;
  }

  sortByCreatedTime(res: any) {
    res.sort(function (a: any, b: any) {
      if (a.CreatedTime > b.CreatedTime) {
        return -1;
      } else if (a.CreatedTime < b.CreatedTime) {
        return 1;
      } else {
        return 0;
      }
    });
    return res;
  }

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

  /***API CALL FOR CREATING MODULE ******
   *  * @param data have data to create new MODULE
   */
  sendEmail(params: any) {
    const httpParams = this.getHttpParams(params);
    return this.http
      .post(
        `/api/Account/SendEmail`,
        {},

        {
          params: httpParams,
        }
      )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  /****Changed from feature branch */
  sendSMS(countryCode: any, mobileNumber: any,body:any,companyId:any,params?:any) {
    const httpParams = this.getHttpParams(params);
    console.log('http params',httpParams);
    return this.http
      .post(
        `/api/Account/SendSMS?countryCode=${countryCode}&mobileNumber=${mobileNumber}&body=${body}&companyId=${companyId}`,{}
        // {
        //   params: httpParams,
        // }
      )
      .pipe(
        map((res: any) => {
          console.log('response of sending sms',res);
          return res;
        })
      );
  }

  storePermissions(permissionsList: any){
    this.permissionsList = permissionsList;
  }

  getPermissions(){
    return this.permissionsList;
  }


}
