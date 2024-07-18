import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CredentialsService } from '../../../shared/src/lib/core/credentials.service';
import { SharedService } from '../../../shared/src/lib/sharedService/shared.service';
import { AuthenticationService } from '../../../shared/src/lib/core/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'shell';
  showMenu: boolean = true;
  isRestPassword: boolean = false;

  constructor(
    private router: Router, 
    private cred: CredentialsService, 
    // private userIdle: UserIdleService,
    private _sharedService: SharedService,
    private authService: AuthenticationService,
    private dialogRef: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    console.log('credentials are', this.cred.credentials);
    console.log('patname is', window.location.pathname);

    if (this.router.url.includes('/reset-password')) {
      this.isRestPassword = true;
    }

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const routeEvent = event as NavigationEnd;
        this.showMenu = !(
          routeEvent.urlAfterRedirects.includes('login') ||
          routeEvent.urlAfterRedirects.includes('forgot-password') ||
          routeEvent.urlAfterRedirects.includes('bad-request') ||
          routeEvent.urlAfterRedirects.includes('reset-password')
        );

        if (this.router.url.split('?')[0].includes('home') || window.location.pathname === '/') {
          if (!this.cred?.credentials) {
            this.router.navigate(['/login']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      }
    });

    // Uncomment if user idle watching is implemented
    // this.userIdle.startWatching();
    // this.userIdle.onTimerStart().subscribe(count => console.log('timer is running', count));
    // this.userIdle.onTimeout().subscribe(() => {
    //   console.log('Time is up');
    //   var msg = 'Session Time out ';
    //   this._sharedService.toastMsg(msg, 'warning');
    //   this.snackBar.open(msg, 'close', {
    //     duration: 2000,
    //     panelClass: ['blue-snackbar']
    //   });
    //   this.dialogRef.closeAll();
    //   this.authService.logout().subscribe((res: any) => {
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     this.router.navigate(['/login']);
    //   });
    //   this.stopWatching();
    // });
  }

  ngOnChanges() { }

  stopWatching() {
    // this.userIdle.stopWatching();
    console.log('we have stopped watching');
  }

  startWatching() {
    // this.userIdle.startWatching();
  }

  restart() {
    // this.userIdle.resetTimer();
  }
}
