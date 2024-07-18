import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
import { SharedService } from '../sharedService/shared.service';
import { CredentialsService } from './credentials.service';
import { AuthenticationService } from './authentication.service';
import { MatDialog } from '@angular/material/dialog';
//import { ErrorPopupComponent } from '../home/acl/error-popup/error-popup.component';
import { isFinite } from 'lodash';
import { LoaderService } from './loader.service';
/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private credService: CredentialsService,
    private authService: AuthenticationService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public loderService: LoaderService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loderService.isLoading.next(true);
    return next
      .handle(request)
      .pipe(catchError((error) => this.errorHandler(error, request)),finalize(()=>{
        this.loderService.isLoading.next(false);
      }));
  }

  // Customize the default error handler here if needed
  private errorHandler(
    response: HttpErrorResponse,
    request: HttpRequest<any>
  ): Observable<HttpEvent<any>> {
    if (response.status == 401) {
      this.authService.logout().subscribe((res: any) => {
        this.router.navigate(['/login']);
      });
    } else if (response.status == 500) {
      // this.router.navigate(['/server-error']);
      this.router.navigate(['/internal-server-error'], {
        queryParams: {
          request_url: response.url,
          request_method: request.method,
          status_code: response.status,
          response: JSON.stringify(response.error),
          request_body: JSON.stringify(request.body),
        },
      });
    } else if (response.status == 400) {
      if (response?.error?.message) {
        this.sharedService.toastMsg(response.error.message, 'error');
      }
      // this.router.navigate(['/bad-request'], {
      //   queryParams: {
      //     request_url: response.url,
      //     request_method: request.method,
      //     status_code: response.status,
      //     response: JSON.stringify(response.error),
      //     request_body: JSON.stringify(request.body),
      //   },
      // });
    } else if (response.status == 404) {
      // this.sharedService.toastMsg(response.message, 'error');
      // this.router.navigate(['/server-error']);
      // this.router.navigate(['/page-not-found'], {
      //   queryParams: {
      //     request_url: response.url,
      //     request_method: request.method,
      //     status_code: response.status,
      //     response: JSON.stringify(response.error),
      //     request_body: JSON.stringify(request.body),
      //   },
      // });
    } else if (response.status == 403) {
      // this.router.navigate(['/server-error']);
      this.router.navigate(['/forbidden'], {
        queryParams: {
          request_url: response.url,
          request_method: request.method,
          status_code: response.status,
          response: JSON.stringify(response.error),
          request_body: JSON.stringify(request.body),
        },
      });
    } else if (response.status === 409  && (String(response?.url).includes('api/UserRoles/ValidateUserToRemove') || String(response?.url).includes('api/EmployeePersonalDetails/ValidateToDisableUser'))) {
      this.sharedService.toastMsg(response.error.content[0].message, 'error');
       //this.sharedService.toastMsg(response.error.message, 'error');
    }
    // else if(response.status === 409 && String(response?.url).includes('api/UserRoles/ValidateUserToRemove') && String(!response?.url).includes('api/UserRoles/ValidateUserRoles') && response.error.content.length > 0){
    //   this.sharedService.toastMsg(response.error.message, 'error');
    // }
    else if (response.status === 409 && !response?.url?.toString().includes('api/UserRoles/ValidateUserToRemove') && !response?.url?.toString().includes('api/UserRoles/ValidateUserRoles')) {
      this.sharedService.toastMsg(response.error.message, 'error');
  }
    throw response;
  }
}
