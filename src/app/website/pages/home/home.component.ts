import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../../models/product.model';
import { ProductsService } from './../../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  productId: string | null = null;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMoreProducts();
    this.route.queryParamMap.subscribe( params => {
      this.productId = params.get('product');
      console.log(this.productId);
    });
  }

  loadMoreProducts() {
    this.productService.getAllProducts( this.limit, this.offset )
        .subscribe( data => {
          this.products = this.products.concat(data);
          this.offset += this.limit;
        } );
  }

  onLoadMore() {
    this.loadMoreProducts();
  }
}
