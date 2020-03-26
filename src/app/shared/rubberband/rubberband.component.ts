import { Point } from './point';
import { Rectangle } from './rectangle';
import { RubberbandCellDirective } from './rubberband-cell.directive';
import { Component, ElementRef, EventEmitter, QueryList, ContentChildren, HostListener, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'nme-rubberband',
  template: `<ng-content></ng-content>`,
  host: {
    '[class.tcs-rubberband-container]': 'true',
  },
})
export class RubberbandComponent {
  /**
   * 开始拖动的坐标
   */
  private mouseDownPoint: Point;

  /**
   * 框选器元素
   */
  private rubberbandElement: HTMLDivElement;

  /**
   * 选中的项目
   */
  @Input()
  public selectedCells: Set<RubberbandCellDirective> = new Set();

  @Output()
  public selectedCellsChange: EventEmitter<Set<RubberbandCellDirective>> = new EventEmitter();

  @ContentChildren(RubberbandCellDirective, { descendants: true })
  public cells: QueryList<RubberbandCellDirective>;

  @HostBinding('class.tcs-rubberband--active')
  public get active() {
    return !!this.mouseDownPoint;
  }

  private get container() {
    return this.elementRef.nativeElement;
  }

  constructor(
      private readonly elementRef: ElementRef<HTMLElement>) {

  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(event: MouseEvent) {
    // 如果点击到RubberbandCell则不启用选择
    if(this.isEventOnRubberbandCellElement(event)) {
      return;
    }

    const containerDOMRect = this.container.getBoundingClientRect();
    this.mouseDownPoint = new Point({
      x: event.x - containerDOMRect.left,
      y: event.y - containerDOMRect.top,
    });

    // 清除上次选中的文件
    if(!event.ctrlKey) {
      this.clearSelectedCells();
      this.selectedCellsChange.emit(this.selectedCells);
    }

    // 删除浏览器文字选择，避免文字拖动问题
    window.getSelection().removeAllRanges();

    if(this.rubberbandElement) {
      this.rubberbandElement.remove();
    }
    this.rubberbandElement = document.createElement('div');
    this.rubberbandElement.classList.add('tcs-rubberband');
    this.container.appendChild(this.rubberbandElement);
  }

  @HostListener('document:mousemove', ['$event'])
  public onDocumentMouseMove(event: MouseEvent) {
    if(!this.mouseDownPoint) {
      return;
    }
    const bounds = new Rectangle();
    const containerDOMRect = this.container.getBoundingClientRect();
    const mousePoint = new Point({
      x: event.x - containerDOMRect.left,
      y: event.y - containerDOMRect.top,
    });

    if(mousePoint.x < 0) {
      mousePoint.x = 0;
    } else if(mousePoint.x > this.container.scrollWidth) {
      mousePoint.x = this.container.scrollWidth;
    }
    if(mousePoint.y < 0) {
      mousePoint.y = 0;
    } else if(mousePoint.y > this.container.scrollHeight) {
      mousePoint.y = this.container.scrollHeight;
    }

    if(mousePoint.x < this.mouseDownPoint.x) {
      bounds.x = mousePoint.x;
      bounds.width = this.mouseDownPoint.x - mousePoint.x;
    } else {
      bounds.x = this.mouseDownPoint.x;
      bounds.width = mousePoint.x - this.mouseDownPoint.x;
    }
    if(mousePoint.y < this.mouseDownPoint.y) {
      bounds.y = mousePoint.y;
      bounds.height = this.mouseDownPoint.y - mousePoint.y;
    } else {
      bounds.y = this.mouseDownPoint.y;
      bounds.height = mousePoint.y - this.mouseDownPoint.y;
    }

    this.rubberbandElement.style.top = `${ bounds.y }px`;
    this.rubberbandElement.style.left = `${ bounds.x }px`;
    this.rubberbandElement.style.width = `${ bounds.width }px`;
    this.rubberbandElement.style.height = `${ bounds.height }px`;

    let changed = false;
    const selectedCells = new Set(
      Array.from(this.cells)
        .filter((cell) => this.isSelectRubberbandCell(cell.nativeElement, bounds)));

    this.selectedCells.forEach(cell => {
      if(!selectedCells.has(cell)) {
        changed = true;
        cell.selected = false;
        cell.selectedChange.emit(cell.selected);
      }
    });

    if(changed || selectedCells.size !== this.selectedCells.size) {
      // if(event.ctrlKey) {
      //   selectedCells.forEach(cell => this.selectedCells.add(cell));
      // } else {
      //   this.selectedCells = selectedCells;
      // }
      // TODO 按下ctrl时的选择逻辑
      this.selectedCells = selectedCells;
      this.selectedCells.forEach(cell => {
        if(!cell.selected) {
          cell.selected = true;
          cell.selectedChange.emit(cell.selected);
        }
      });
      this.selectedCellsChange.emit(this.selectedCells);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  public onDocumentMouseUp(event: MouseEvent) {
    if(this.mouseDownPoint) {
      this.mouseDownPoint = null;
      if(this.rubberbandElement) {
        this.rubberbandElement.remove();
        this.rubberbandElement = null;
      }
    }
  }

  private clearSelectedCells() {
    this.selectedCells.forEach(cell => {
      cell.selected = false;
      cell.selectedChange.emit(cell.selected);
    });
    if(this.selectedCellsChange && this.selectedCells.size > 0) {
      this.selectedCells.clear();
      this.selectedCellsChange.emit(this.selectedCells);
    }
  }

  private isSelectRubberbandCell(rubberbandCellElement: HTMLElement, bounds: Rectangle) {
    const clientRect = rubberbandCellElement.getBoundingClientRect();
    const hostClientRect = this.container.getBoundingClientRect();
    const rubberbandCellBounds = new Rectangle({
      x: clientRect.x - hostClientRect.x,
      y: clientRect.y - hostClientRect.y,
      width: clientRect.width,
      height: clientRect.height,
    });
    const rubberbandCenterPoint = new Point({
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    });
    const rubberbandCellCenterPoint = new Point({
      x: rubberbandCellBounds.x + rubberbandCellBounds.width / 2,
      y: rubberbandCellBounds.y + rubberbandCellBounds.height / 2,
    });
    const xIntersect = Math.abs(rubberbandCenterPoint.x - rubberbandCellCenterPoint.x) < (bounds.width / 2 + rubberbandCellBounds.width / 2);
    const yIntersect = Math.abs(rubberbandCenterPoint.y - rubberbandCellCenterPoint.y) < (bounds.height / 2 + rubberbandCellBounds.height / 2);
    if(xIntersect && yIntersect) {
      return true;
    } else {
      return false;
    }
  }

  private isEventOnRubberbandCellElement(event: MouseEvent) {
    return Array.from(this.container.querySelectorAll('.tcs-rubberband-cell')).some(element => {
      return event.target === element || this.isChildNodeOfParentNode(event.target as Node, element);
    });
  }

  private isChildNodeOfParentNode(element: Node, parent: Node) {
    while(element.parentNode) {
      const parentNode = element.parentNode;
      if(parentNode === parent) {
        return true;
      } else {
        element = parentNode;
      }
    }
    return false;
  }

}
