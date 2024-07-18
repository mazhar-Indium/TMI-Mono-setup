import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
  action: string = ''
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.action = data.action;
  }

  ngOnInit(): void {}
}
