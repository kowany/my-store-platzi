import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string | null = null;
  product: Product | null = null;
  limit = 10;
  offset = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private loation: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap( params => {
        this.productId = params.get('id');
        if ( this.productId ) {
            return this.productService.getOne(this.productId);
        }
        return [null];
      }),
    )
    .subscribe( data => {
      this.product = data;
    });
  }

  goToBack() {
    this.loation.back();
  }

}
