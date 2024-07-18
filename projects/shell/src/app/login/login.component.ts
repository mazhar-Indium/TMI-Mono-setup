import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthenticationService, AclService, SharedService } from '@shared';
// import { UserIdleService } from 'angular-user-idle';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AclService, AuthenticationService, SharedService } from '../../../../shared/src/public-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  hide = true;
  firstLogin!: boolean;
  step: any = 1;
  email: any;

  constructor(
    // private userIdle: UserIdleService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private aclService: AclService,
    private _sharedService: SharedService,
    private dialogRef: MatDialog,
    private snackBar: MatSnackBar,
    private renderer: Renderer2
  ) {
    this.createForm();
  }

  ngOnInit() {
    // Disable right click globally
    this.renderer.listen('document', 'contextmenu', (event) => {
      event.preventDefault();
    });

    // Add a new state to the history stack
    history.pushState(null, '', window.location.href);

    // Listen for the popstate event and push a new state to prevent back navigation
    window.addEventListener('popstate', (event) => {
      history.pushState(null, '', window.location.href);
    });

    // Listen for fullscreen change events
    document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('webkitfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('mozfullscreenchange', this.onFullscreenChange.bind(this));
    document.addEventListener('MSFullscreenChange', this.onFullscreenChange.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    document.removeEventListener('webkitfullscreenchange', this.onFullscreenChange.bind(this));
    document.removeEventListener('mozfullscreenchange', this.onFullscreenChange.bind(this));
    document.removeEventListener('MSFullscreenChange', this.onFullscreenChange.bind(this));
  }

  enterFullScreen(): void {
    const doc: any = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) { // Firefox
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) { // Chrome, Safari and Opera
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) { // IE/Edge
      doc.msRequestFullscreen();
    }
  }

  onFullscreenChange(): void {
    if (!document.fullscreenElement && !document.fullscreenElement && !document.fullscreenElement && !document.fullscreenElement) {
      // Re-enter fullscreen mode
      this.enterFullScreen();
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
        ],
      ],
      organization: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(25),
        ],
      ]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe((credentials: any) => {
        this.enterFullScreen();  // Request full-screen mode after successful login
        this.router.navigate(['/home']);
      });
      // this.userIdle.startWatching();

      // this.userIdle.onTimerStart().subscribe(count => console.log('timer is running', count));
      // this.userIdle.onTimeout().subscribe(() => {
      //   console.log('Time is up');
      //   var msg = 'Session Time out ';
      //   this._sharedService.toastMsg(msg, 'warning');
      //   this.dialogRef.closeAll();
      //   this.authService.logout().subscribe((res: any) => {
      //     sessionStorage.clear();
      //     localStorage.clear();
      //     this.router.navigate(['/login'])
      //       .then(() => {
      //         window.location.reload();
      //       });
      //   });
      //   this.stopWatching();
      // });
    }
  }

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

  resetPassword() {
    if (this.loginForm.get('email')?.hasError('required') || this.loginForm.get('email')?.hasError('email') || this.loginForm.get('organization')?.hasError('required') || this.loginForm.get('organization')?.hasError('minlength') || this.loginForm.get('organization')?.hasError('maxlength')) {
      return;
    } else {
      this.authService.checkEmail(this.loginForm.get('email')?.value, this.loginForm.get('organization')?.value).subscribe((res: any) => {
        this.email = this.loginForm.get('email')?.value;
        if (res.message === "Incorrect Credentials." || res.error) {
          return;
        } else {
          this.step = 2;
          let location = window.location.origin;
          let url: any;
          function makePlainTextClickable(text: any, url: any) {
            return `<a href="${url}">${text}</a>`;
          }
          function convertAnchorToPlainText(html: any) {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = html;

            const anchorElement = tempElement.querySelector('a');
            if (anchorElement) {
              url = anchorElement.href;
              const text = anchorElement.textContent;
              return `${text} (${url})`;
            }
            return tempElement.textContent || tempElement.innerText;
          }
          const html = `<a href="${location}/reset-password?Id=${res.employeeId}&PassKey=${res.passKey}&Email=${res.email}">Reset Link</a>`;
          const plainText = convertAnchorToPlainText(html);
          let linkText = makePlainTextClickable(plainText, url);
          let emailBody = {
            to: res.email,
            companyId: 'mainCompanyId', // Replace with your actual mainCompanyId
            subject: 'Password Reset Link',
            html: `<h1>Please Click on below link to reset password</h1>
           <p>${linkText}</p>`,
          };
          this.aclService.sendEmail(emailBody, this.email);
        }
      },
        (error:any) => {
          this.error = error;
          this.step = 1;
          this.loginForm.reset();
          this.router.navigate(['/login']);
        }
      );
    }
  }

  linkSent() {
    this.step = 1;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  keydown(event: any) {
    event.preventDefault();
    if (this.step == 1) {
      this.login();
    } else if (this.step == 1) {
      this.resetPassword();
    }
  }
}

