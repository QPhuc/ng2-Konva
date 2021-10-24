import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
})
export class CircleComponent implements OnInit {
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
  // public width = window.innerWidth;
  // public height = window.innerHeight;

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

  public configCircleStage: Observable<any> = of({
    x: this.WIDTH / 2,
    y: this.HEIGHT / 2,
    radius: this.RADIUS,
    fill: '#FFF2CC',
    stroke: '#56719D',
    strokeWidth: 1,
    draggable: false,
    name: 'myCircleStage',
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
      (circle.x - this.WIDTH / 2) ** 2 + (circle.y - this.HEIGHT / 2) ** 2 >=
      (this.RADIUS - this.circleRadius) ** 2
    ) {
      circle.x = this.lastPosX;
      circle.y = this.lastPosY;
    }

    this.lastPosX = circle.x;
    this.lastPosY = circle.y;
  }

  ngAfterViewInit() {
    // // Resize Canvas as soon as we can get container width and height
    // // Also IE Comp
    // // const event = document.createEvent("UIEvents");
    // // event.initEvent("resize", false, false);
    // // window.dispatchEvent(event);

    var that = this;
    // //  const event = document.createEvent("UIEvents");
    // //  event.initEvent("resize", false, false);

    // //  // Dispatch/Trigger/Fire the event
    // // document.dispatchEvent(event);

    window.addEventListener('resize', function () {
      console.log('## Start Resize ##');

      var stage = that.stage.getStage();

      var containerWidth = window.innerWidth; //that.container.nativeElement.offsetWidth;
      var containerHeight = window.innerHeight; //that.container.nativeElement.offsetHeight;

      stage.width(containerWidth);
      stage.height(containerHeight);
      // stage.scale({ x: scale, y: scale });

      // var mycirle = stage.find(".myCircle")[0];
    });
  }
}
