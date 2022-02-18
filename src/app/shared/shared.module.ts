import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

import { HighlightDirective } from './directives/highlight.directive';
import { ImageErrorDirective } from './directives/image-error.directive';
import { ReversePipe } from './pipes/reverse.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    HighlightDirective,
    ImageErrorDirective,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SwiperModule
  ],
  exports: [
    HighlightDirective,
    ImageErrorDirective,
    ReversePipe,
    TimeAgoPipe,
    ImgComponent,
    ProductComponent,
    ProductsComponent
  ]
})
export class SharedModule { }
