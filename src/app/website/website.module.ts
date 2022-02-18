import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'swiper/angular';
import { QuicklinkModule } from 'ngx-quicklink';

import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';

import { ReplaceCommaByDotDirective } from './pipes/replace-comma-by-dot.pipe';
import { VocalesPipe } from './pipes/vocales.pipe';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';


@NgModule({
  declarations: [
    NavComponent,
    ReplaceCommaByDotDirective,
    VocalesPipe,
    HomeComponent,
    MyCartComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryComponent,
    ProfileComponent,
    ProductDetailComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    SwiperModule,
    SharedModule,
    QuicklinkModule
  ]
})
export class WebsiteModule { }
