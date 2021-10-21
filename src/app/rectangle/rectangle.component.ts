import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { KonvaComponent } from 'ng2-konva';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
})
export class RectangleComponent implements OnInit {
  public WIDTH = 500;
  public HEIGHT = 300;
  public RADIUS = this.WIDTH / 2;
  public circleRadius = 10;
  public lastPosX = 0;
  public lastPosY = 0;
  public rows = new Array(170);

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

  public configRectangleStage: Observable<any> = of({
    x: 0,
    y: 0,
    width: this.WIDTH,
    height: this.HEIGHT,
    fill: '#FFF2CC',
    stroke: '#56719D',
    strokeWidth: 1,
    draggable: false,
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
}
