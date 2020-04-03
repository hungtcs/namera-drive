import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, AfterViewInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

export class PromptData {
  public title?: string = '请输入';
  public value?: string = '';
  public required?: boolean = false;
  public description?: string;
  public placeholder?: string;
}

@Component({
  selector: 'nme-prompt',
  styleUrls: ['./prompt.component.scss'],
  templateUrl: './prompt.component.html',
})
export class PromptComponent implements AfterViewInit {
  @ViewChild('input', { read: ElementRef })
  public input: ElementRef<HTMLInputElement>;

  @ViewChild('form', { read: NgForm })
  public form: NgForm;

  @Output()
  public cancel: EventEmitter<void> = new EventEmitter();

  @Output()
  public confirm: EventEmitter<string> = new EventEmitter();

  constructor(
      public readonly dialogRef: MatDialogRef<PromptComponent, string>,
      @Inject(MAT_DIALOG_DATA) public data: PromptData,) {

  }

  public onSubmit() {
    if(this.form.invalid) {
      return;
    } else {
      this.confirm.emit(this.data.value);
    }
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      const index = this.data.value.lastIndexOf('.');
      this.input.nativeElement.setSelectionRange(0, index);
    });
  }

}
