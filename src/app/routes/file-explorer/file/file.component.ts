import { FileStat } from '@shared';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nme-file',
  styleUrls: ['./file.component.scss'],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit {

  @Input()
  public file: FileStat;

  @Input()
  @HostBinding('class.nme-file--selected')
  public selected: boolean;

  @Output()
  public selectedChange: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('class.nme-file--file')
  public get isFile() {
    return this.file?.isFile()
  }
  @HostBinding('class.nme-file--folder')
  public get isFolder() {
    return this.file?.isDirectory()
  }

  constructor() {

  }

  public ngOnInit(): void {

  }

}
