import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'nme-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public title: string;
  public description: string;

  constructor(
      public readonly dialogRef: MatDialogRef<ConfirmComponent>,
      @Inject(MAT_DIALOG_DATA) data: Pick<ConfirmComponent, 'title'|'description'>) {
    Object.assign(this, data);
  }

  ngOnInit(): void {
  }

}
