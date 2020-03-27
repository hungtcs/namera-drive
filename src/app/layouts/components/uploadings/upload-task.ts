import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

export class UploadTask {
  id: string;
  filename: string;
  progress: number;
  observable: Observable<HttpEvent<any>>;

  constructor(that: Partial<UploadTask> = {}) {
    Object.assign(this, that);
  }

}
