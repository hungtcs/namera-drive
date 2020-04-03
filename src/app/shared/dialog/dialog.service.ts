import { Injectable } from '@angular/core';
import { ConfirmComponent, ConfirmData } from './contents/confirm/confirm.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PromptComponent, PromptData } from './contents/prompt/prompt.component';
import { tap, mergeMap, catchError } from 'rxjs/operators';
import { from, of, Observable } from 'rxjs';

export class PromptDialogOptions extends MatDialogConfig<PromptData> {
  width? = '320px';
  onCancel?: () => any = () => {};
  onConfirm?: (value?: string) => boolean | Promise<boolean> | Observable<boolean> | any = () => {};
}

export class ConfirmDialogOptions extends MatDialogConfig<ConfirmData> {
  onCancel?: () => any = () => {};
  onConfirm?: (value?: boolean) => boolean | Promise<boolean> | Observable<boolean> | any = () => {};
}

@Injectable()
export class DialogService {

  constructor(
      private readonly dialog: MatDialog) {

  }

  public confirm(options: ConfirmDialogOptions) {
    options = Object.assign(new ConfirmDialogOptions(), options);
    const dialogRef = this.dialog.open(ConfirmComponent, { ...options });
    dialogRef.componentInstance.confirm
      .pipe(mergeMap(result => {
        if(result) {
          return this.checkConfirmResult(options.onConfirm(true));
        } else {
          return this.checkConfirmResult(options.onCancel());
        }
      }))
      .pipe(tap(result => result && dialogRef.close()))
      .subscribe()
  }

  public prompt(options: PromptDialogOptions) {
    options = Object.assign(new PromptDialogOptions(), options);
    const dialogRef = this.dialog.open(PromptComponent, { ...options });
    dialogRef.componentInstance.cancel
      .pipe(mergeMap(() => {
        const result = options.onCancel();
        return of(!!(result ?? true))
      }))
      .pipe(tap(result => result && dialogRef.close()))
      .subscribe()
    dialogRef.componentInstance.confirm
      .pipe(mergeMap(value => this.checkConfirmResult(options.onConfirm(value))))
      .pipe(tap(result => result && dialogRef.close()))
      .subscribe()
  }

  private checkConfirmResult(result: any) {
    if(typeof(result) === 'boolean') {
      return of(result);
    } else if(result instanceof Promise || result instanceof Observable) {
      return from(result).pipe(catchError(() => of(false)));
    } else {
      return of(!!result);
    }
  }

}
