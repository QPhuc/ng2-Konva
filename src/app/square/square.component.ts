import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
})
export class SquareComponent implements OnInit {
  public WIDTH = 300;
  public HEIGHT = 300;
  public RADIUS = 150;
  public circleRadius = 10;
  public lastPosX = 0;
  public lastPosY = 0;
  public rows = new Array(100);

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

  public configCircle: Observable<any> = of({
    x: 100,
    y: 100,
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
    var that = this;

    window.addEventListener('resize', function () {
      console.log('## Start Resize ##');

      var stage = that.stage.getStage();

      var containerWidth = window.innerWidth;
      var containerHeight = window.innerHeight;

      stage.width(containerWidth);
      stage.height(containerHeight);
    });
  }
}
