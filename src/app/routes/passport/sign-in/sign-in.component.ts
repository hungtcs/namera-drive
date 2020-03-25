import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UNAUTHORIZED } from 'http-status-codes';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SignInEntity, AuthService } from '@shared';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  public model = new SignInEntity();
  public submitting: boolean = false;
  public invalidPassword: boolean = false;

  @ViewChild('form', { read: NgForm })
  public form: NgForm;

  constructor(
      private readonly router: Router,
      private readonly snackBar: MatSnackBar,
      private readonly authService: AuthService) {

  }

  public ngOnInit(): void {

  }

  public onFormSubmit() {
    if(this.form.invalid) {
      Object.entries(this.form.controls).forEach(([_, control]) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    if(this.submitting) {
      return;
    }
    this.submitting = true;
    this.invalidPassword = false;
    this.authService.signIn(this.model)
      .pipe(finalize(() => this.submitting = false))
      .pipe(tap(() => this.router.navigate(['/'])))
      .pipe(catchError(error => {
        if(error instanceof HttpErrorResponse) {
          if(error.status === UNAUTHORIZED) {
            this.invalidPassword = true;
            return of(null);
          }
          this.snackBar.open(error.error?.message, null, {
            verticalPosition: 'top'
          });
          return of(null);
        }
        this.snackBar.open('错误', null, {
          verticalPosition: 'top',
        });
        return of(null);
      }))
      .subscribe();
  }

}
