import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from './dialog.service';
import { AlertComponent } from './contents/alert/alert.component';
import { MatInputModule } from '@angular/material/input';
import { PromptComponent } from './contents/prompt/prompt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './contents/confirm/confirm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  providers: [
    DialogService,
  ],
  declarations: [
    AlertComponent,
    PromptComponent,
    ConfirmComponent,
  ],
  entryComponents: [
    AlertComponent,
    PromptComponent,
    ConfirmComponent,
  ],
})
export class DialogModule {

}
