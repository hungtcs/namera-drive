import { FileStat } from '@shared';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';

const typeIcon = [
  {
    test: /image\/*/,
    icon: 'image',
    type: 'font',
    color: '#2B78FE',
  },
  {
    test: /video\/*/,
    icon: 'movie_creation',
    type: 'font',
    color: '#D80000',
  },
  {
    test: /application\/(vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)/,
    icon: 'microsoft-excel',
    type: 'svg',
    color: '#107B0F',
  },
  {
    test: /application\/(msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)/,
    icon: 'microsoft-word',
    type: 'svg',
    color: '#2B579B',
  },
  {
    test: /application\/(vnd\.ms-powerpoint|vnd\.openxmlformats-officedocument\.presentationml\.presentation)/,
    icon: 'microsoft-powerpoint',
    type: 'svg',
    color: '#D24825',
  },
];

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
    return this.domSanitizer.bypassSecurityTrustStyle(`url(/api/media/thumbnail/${ encodeURIComponent(Base64.encode(this.file.fullpath)) })`);
  }

  public get icon() {
    const type = typeIcon.find(item => item.test.test(this.file.mimeType));
    return type ?? { icon: 'description', type: 'font', color: '#2B78FE' };
  }

  constructor(
      private readonly domSanitizer: DomSanitizer) {

  }

  public ngOnInit(): void {

  }

}
