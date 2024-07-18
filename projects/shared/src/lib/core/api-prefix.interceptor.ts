import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';
import { environment } from '../../../../shell/environments/environment';
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(private credService: CredentialsService) {
  }
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
    if (request.url.includes('/api/Organisations/UploadLogo')) {
      console.log('in this url',request.url);
      console.log(request)
      request = request.clone({
        url: environment.baseUrl+request.url,
        setHeaders: {
          //'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          key: 'x-api-key',
          value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          Authorization: `Bearer ${this.credService.credentials?.token}`,
        },
      });
    }
    else if (request.url.includes('/api/EmployeePersonalDetails/UploadProfile')) {
      console.log('in this url',request.url);
      console.log(request)
      request = request.clone({
        url: environment.baseUrl+request.url,
        setHeaders: {
          //'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          key: 'x-api-key',
          value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          Authorization: `Bearer ${this.credService.credentials?.token}`,
        },
      });
    }
    else if (request.url.includes('/api/Organisations/MasterBulkUpload')) {
      console.log('in this url for bulk',request.url);
      console.log(request)
      request = request.clone({
        url: environment.baseUrl+request.url,
        setHeaders: {
          //'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          key: 'x-api-key',
          value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          Authorization: `Bearer ${this.credService.credentials?.token}`,
        },
      });
    }
    else if (!/^(http|https):/i.test(request.url)) {
      console.log('in second this url',request.url);
      request = request.clone({
        
        //url: environment.baseUrl + request.url,
        url: environment.baseUrl+request.url,
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          key: 'x-api-key',
          value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          Authorization: `Bearer ${this.credService.credentials?.token}`,
        },
      });
    }
   
    
    
    if (request.url.includes('https://be-master.uat.elixirhr.com')) {
      request = request.clone({
        url: request.url,
        setHeaders: {
          // 'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
          key: 'x-api-key',
          value: 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',
          Authorization: `Bearer ${this.credService.credentials?.token}`,
        },
      });
    }
    if(request.url.includes('assets/countryMaster.json')){
      request = request.clone({
        url: request.url
      });
    }
    return next.handle(request);
  }
}

