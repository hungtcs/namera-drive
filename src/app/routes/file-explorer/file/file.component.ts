import { FileStat } from '@shared';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  public get thumbnailStyle() {
    return this.domSanitizer.bypassSecurityTrustStyle(`url(/api/media/thumbnail/${ Base64.encode(this.file.fullpath) })`);
  }

  constructor(
      private readonly domSanitizer: DomSanitizer) {

  }

  public ngOnInit(): void {

  }

}
