import { PreviewWrapperComponent } from './preview-wrapper/preview-wrapper.component';
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { FileStat } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PreviewProgramsService {

  constructor(
      private readonly injector: Injector,
      private readonly applicationRef: ApplicationRef,
      private readonly componentFactoryResolver: ComponentFactoryResolver) {

  }

  public showPreviewProgram(file: FileStat) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PreviewWrapperComponent);
    const componentRef = componentFactory.create(this.injector);
    componentRef.instance.file = file;
    componentRef.instance.componentRef = componentRef;
    this.applicationRef.attachView(componentRef.hostView);
    document.body.appendChild(componentRef.location.nativeElement);
  }

}
