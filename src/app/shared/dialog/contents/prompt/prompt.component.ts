import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'nme-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent implements OnInit, AfterViewInit {
  public title: string = '请输入';
  public value: string = '';
  public required: boolean = false;
  public description: string;

  @ViewChild('input', { read: ElementRef })
  public input: ElementRef<HTMLInputElement>;

  constructor(
      public readonly dialogRef: MatDialogRef<PromptComponent, string>,
      @Inject(MAT_DIALOG_DATA) data: Pick<PromptComponent, 'title'|'value'|'required'|'description'>,
      @Inject(DOCUMENT) private readonly document: Document) {
    Object.assign(this, data);
  }

  public ngOnInit(): void {

  }

  public onOk() {
    if(this.required && !this.value) {
      return;
    } else {
      this.dialogRef.close(this.value);
    }
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      const index = this.value.lastIndexOf('.');
      this.input.nativeElement.setSelectionRange(0, index);
    });
  }

}
