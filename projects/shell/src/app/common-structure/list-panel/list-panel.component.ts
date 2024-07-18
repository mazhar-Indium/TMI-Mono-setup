import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../../../../../shared/src/public-api';
// import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss']
})
export class ListPanelComponent implements OnInit {
  @Input() listName: string = '';
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() itemsToBeRemoved!: any;
  @Input() displayedColumns!: any[];
  @Input() downloadListName: string = '';
  @Input() filterOptions!: any[];
  @Output() updateFilterEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateColumnFilterEmitter: EventEmitter<any> = new EventEmitter<any>();
  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
    this.updateFilterEmitter.emit(filterValue);
  }

  downloadPDF(){}
  // downloadPDF(){
  //   var doc = new jsPDF();
  //   let itemToBeRemoved = this.itemsToBeRemoved;
  //   let head = this.displayedColumns.filter((item: any) => {
  //     return !itemToBeRemoved.includes(item);
  //   });

  //   let pdfData: any = [];
  //   let variableNames = Object.keys(this.dataSource.data[0]);
  //   this.dataSource.data.forEach((e: any) => {
  //     var tempObj = [];
  //     for(let x in variableNames){
  //       if(this.displayedColumns.includes(variableNames[x])){
  //         tempObj.push(e[variableNames[x]]);
  //       }
  //     }
  //     pdfData.push(tempObj);
  //     // tempObj.push(e.RCSGradeName);
  //     // tempObj.push(e.RCSGradeShortName);
  //     // tempObj.push(e.LocationName);
  //     // tempObj.push(e.Status);
  //     // tempObj.push(e.FromDate);
  //     // tempObj.push(e.ToDate);
  //     // pdfData.push(tempObj);
  //   });
  //   doc.setFontSize(18);
  //   doc.setFontSize(11);
  //   doc.setTextColor(100);
  //   (doc as any).autoTable({
  //     head: [head],
  //     body: pdfData,
  //     theme: 'striped',
  //     didDrawCell: (data: any) => {
  //     },
  //   });

  //   // Open PDF document in new tab
  //   doc.output('dataurlnewwindow');

  //   // Download PDF document
  //   doc.save(this.downloadListName);
  // }

  exportToExcel(){
    let variableNames = Object.keys(this.dataSource.data[0]);
    let excelData: any = [];
    this.dataSource.data.forEach((u: any) => {
      let obj: any = {};
      for(let x in variableNames){
        if(this.displayedColumns.includes(variableNames[x])){
          obj[variableNames[x]] = u[variableNames[x]]
        }
      }
      excelData.push(obj);
    });
    // this.sharedService.exportAsExcelFile(excelData, this.downloadListName);
  }

  exportToCSV(){
    let itemToBeRemoved = this.itemsToBeRemoved;
    let variableNames = Object.keys(this.dataSource.data[0]);
    let columns = this.displayedColumns.filter((item: any) => {
      return !itemToBeRemoved.includes(item);
    });
    let csvData: any = [];
    this.dataSource.data.forEach((u: any) => {
      let obj: any = {};
      for(let x in variableNames){
        if(this.displayedColumns.includes(variableNames[x])){
          obj[variableNames[x]] = u[variableNames[x]]
        }
      }
      csvData.push(obj);
    });
    this.sharedService.downloadFile(csvData, this.downloadListName, columns);
  }

  columnFilter() {
    this.displayedColumns = [];
    for (let f of this.filterOptions) {
      if (f.checked === true) {
        this.displayedColumns.push(f.title);
      }
    }
    this.updateColumnFilterEmitter.emit(this.displayedColumns);
  }

}

