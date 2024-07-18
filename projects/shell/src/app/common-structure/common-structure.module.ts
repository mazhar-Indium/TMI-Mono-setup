import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ListPanelComponent } from './list-panel/list-panel.component';
import { ToastComponent } from './toast/toast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateConfirmationComponent } from './update-confirmation/update-confirmation.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MaterialModule } from '../material.module';
import { SharedService } from '../../../../shared/src/public-api';
@NgModule({
  declarations: [
    LogoutConfirmationComponent,
    BreadcrumbComponent,
    ListPanelComponent,
    UpdateConfirmationComponent,
    DeleteConfirmationComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [BreadcrumbComponent, ListPanelComponent],
  providers: [SharedService]
})
export class CommonStructureModule { }
