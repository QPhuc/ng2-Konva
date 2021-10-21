import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircleComponent } from './circle/circle.component';
import { SquareComponent } from './square/square.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { DiamondComponent } from './diamond/diamond.component';

const routes: Routes = [
  { path: 'circle', component: CircleComponent },
  { path: 'square', component: SquareComponent },
  { path: 'rectangle', component: RectangleComponent },
  { path: 'diamond', component: DiamondComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
