import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from './contents/confirm/confirm.component';
import { PromptComponent } from './contents/prompt/prompt.component';
import { tap } from 'rxjs/operators';

export interface PromptOptions {
  title?: string;
  value?: string;
  width?: string;
  required?: boolean;
}

@Injectable()
export class DialogService {

  constructor(
      private readonly dialog: MatDialog) {

  }

  public confirm(config: MatDialogConfig) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      ...config,
      data: {

      },
    });
    return dialogRef.afterClosed();
  }

  public prompt(options: PromptOptions) {
    const dialogRef = this.dialog.open(PromptComponent, {
      width: options.width ?? '320px',
      data: { ...options },
    });
    return dialogRef.afterClosed();
  }


}
