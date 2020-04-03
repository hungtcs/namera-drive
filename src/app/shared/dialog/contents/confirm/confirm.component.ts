import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export class ConfirmData {
  public title?: string = '确认';
  public description?: string = '您确认执行此操作么？';
}

@Component({
  selector: 'nme-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent {

  @Output()
  public confirm: EventEmitter<boolean> = new EventEmitter();

  constructor(
      public readonly dialogRef: MatDialogRef<ConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: ConfirmData) {
  }

}
