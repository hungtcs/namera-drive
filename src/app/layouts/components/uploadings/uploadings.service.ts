import { Injectable, EventEmitter } from '@angular/core';
import { UploadTask } from './upload-task';

@Injectable({
  providedIn: 'root'
})
export class UploadingsService {

  public uploadTasks: Array<UploadTask> = new Array();
  public uploadTasksChange: EventEmitter<Array<UploadTask>> = new EventEmitter();

  constructor() {

  }

  public addUploadTask(task: UploadTask) {
    this.uploadTasks.unshift(task);
    this.uploadTasksChange.emit(this.uploadTasks);
  }

  public removeUploadTask(id: string) {
    const index = this.uploadTasks.findIndex(task => task.id === id);
    if(index >= 0) {
      this.uploadTasks.splice(index, 1);
    }
    this.uploadTasksChange.emit(this.uploadTasks);
  }

}
