import { UploadingsService } from './uploadings.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'nme-uploadings',
  styleUrls: ['./uploadings.component.scss'],
  templateUrl: './uploadings.component.html',
})
export class UploadingsComponent implements OnInit {

  public get uploadTasks() {
    return this.uploadingsService.uploadTasks;
  }

  public get activeUploadTasks() {
    return this.uploadTasks.filter(task => task.progress < 100);
  }

  constructor(
      private readonly uploadingsService: UploadingsService) {

  }

  public ngOnInit(): void {

  }

  @HostListener('click', ['$event'])
  public onHostClick(event: MouseEvent) {
    event.stopPropagation();
  }

}
