import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';
import {
  BehaviorSubject,
  combineLatest,
  fromEvent,
  Observable,
  of,
} from 'rxjs';
import { pairwise, map, startWith, scan, tap } from 'rxjs/operators';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
})
export class SquareComponent implements OnInit {
  public WIDTH = 300;
  public HEIGHT = this.WIDTH;
  public RADIUS = this.WIDTH / 2;
  public circleRadius = 10;
  public lastPosX = 0;
  public lastPosY = 0;
  public column = 10;
  public row = this.column;
  public gridWidth = this.WIDTH / this.column;
  public rows = new Array(this.row * this.column);

  @ViewChild('stage', { static: false }) public stage!: KonvaComponent;
  @ViewChild('container', { static: false })
  public container!: ElementRef;
  @ViewChild('circle', { static: false }) public konvaCircle!: KonvaComponent;

  constructor() {}

  ngOnInit() {}

  //Konva
  public configStage = new BehaviorSubject({
    width: this.WIDTH,
    height: this.HEIGHT,
  });

  public configSquareStage: Observable<any> = of({
    x: 0,
    y: 0,
    width: this.WIDTH,
    height: this.HEIGHT,
    // rotation: 45,
    // sides: 4,
    // radius: (this.RADIUS * 7) / 5,
    fill: '#FFF2CC',
    stroke: '#56719D',
    strokeWidth: 1,
    draggable: false,
  });

  public configCircle1: Observable<any> = of({
    x: 100,
    y: 100,
    radius: this.circleRadius,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true,
    name: 'myCircle',
  });

  public configCircle2: Observable<any> = of({
    x: 120,
    y: 120,
    radius: this.circleRadius,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true,
    name: 'myCircle',
  });

  public configGroup: Observable<any> = of({
    draggable: true,
  });

  handleClick(event: any) {
    // console.log('Hello Circle', event);
    var stage = this.stage.getStage();
    var cirles = stage.find('.myCircle');
    console.log(cirles);
  }

  dragmove(event: any) {
    var circle = event._stage.attrs;

    if (
      circle.x - this.circleRadius < 0 ||
      circle.x + this.circleRadius > this.WIDTH ||
      circle.y - this.circleRadius < 0 ||
      circle.y + this.circleRadius > this.HEIGHT
    ) {
      circle.x = this.lastPosX;
      circle.y = this.lastPosY;
    }

    this.lastPosX = circle.x;
    this.lastPosY = circle.y;
  }

  // private scale: Observable<any> = fromEvent<WheelEvent>(window, 'wheel').pipe(
  //   map((e) => e.deltaY),
  //   scan((oldScale, deltaY) => {
  //     console.log('scale', oldScale);
  //     const scaleBy = 1.5;
  //     return deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  //   }, 1)
  // );

  // private position = this.scale.pipe(
  //   pairwise(),
  //   scan(
  //     (oldPosition: any, [oldScale, newScale]) => {
  //       console.log('test', oldPosition);
  //       const stage = this.stage.getStage();

  //       const absoluteMouse = stage.getPointerPosition();
  //       if (!absoluteMouse) {
  //         return oldPosition;
  //       }
  //       const relativeMouse = {
  //         x: absoluteMouse.x / oldScale - stage.x() / oldScale,
  //         y: absoluteMouse.y / oldScale - stage.y() / oldScale,
  //       };
  //       return {
  //         x: -(relativeMouse.x - absoluteMouse.x / newScale) * newScale,
  //         y: -(relativeMouse.y - absoluteMouse.y / newScale) * newScale,
  //       };
  //     },
  //     { x: 0, y: 0 }
  //   )
  // );

  // private size = fromEvent(window, 'resize').pipe(
  //   map(() => {
  //     const container = this.container.nativeElement;
  //     return {
  //       height: container.offsetHeight,
  //       width: container.offsetWidth,
  //     };
  //   })
  // );

  // public configStage = combineLatest(
  //   this.scale.pipe(startWith(1)),
  //   this.position.pipe(startWith({ x: 0, y: 0 })),
  //   this.size
  // ).pipe(
  //   map(([scale, position, size]) => ({
  //     draggable: true,
  //     scaleX: scale,
  //     scaleY: scale,
  //     ...position,
  //     ...size,
  //   })),
  //   startWith({
  //     height: 1000,
  //     width: 1000,
  //   })
  // );

  // ngAfterViewInit() {
  // Resize Canvas as soon as we can get container width and height
  // Also IE Comp
  // const event = document.createEvent('UIEvents');
  // event.initEvent('resize', false, false);
  // window.dispatchEvent(event);

  // const test = new Hammer(this.container.nativeElement, {
  //   recognizers: [[Pinch]],
  // });

  // test.on('pinch', (e:any) => alert(JSON.stringify(e)));
  // }
}
