import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KonvaModule } from 'ng2-konva';
import { CircleComponent } from './circle/circle.component';
import { SquareComponent } from './square/square.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { DiamondComponent } from './diamond/diamond.component';

@NgModule({
  declarations: [AppComponent, CircleComponent, SquareComponent, RectangleComponent, DiamondComponent],
  imports: [BrowserModule, AppRoutingModule, KonvaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
