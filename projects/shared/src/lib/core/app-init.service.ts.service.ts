import { Injectable }  from '@angular/core';
 
@Injectable()
export class AppInitService {
 
    constructor() {
    }
    
    Init() {
 
        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            
            ////do your initialisation stuff here  
            setTimeout(() => {
                console.log('AppInitService Finished');
              //   let location = window.location.origin
              //  const webUrl = `${location}/login`;
              //  window.location.href = webUrl;
              //   resolve();
            }, 6000);
 
        });
    }
}
 