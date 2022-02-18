import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

import { CreateProductDTO, Product } from '../../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total = 0;
  @Input() products: Product[] = [];
  // @Input() productId: string | null = null;
  @Input()
  set productId( id:string | null ) {
    if ( id ) {
      this.onShowDetail(id);
    }
  };
  @Output() loadMore = new EventEmitter();

  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    description: '',
    category: {
      id: -1,
      name: ''
    }
  };

  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  // today = new Date();
  // date = new Date(2021, 1, 21);
  // cadena = 'murcielago';
  // bill = 0;
  // image = 'https://static.remove.bg/remove-bg-web/3a7401e33933f092e5fea5ef460b0cfd79d85fe8/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg';

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
   }

  onAddToShoppingCart( product: Product ) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onLoadMore() {
    this.loadMore.emit();
  }
  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    if ( !this.showProductDetail ) {
      this.showProductDetail = true;
    }
    this.productService.getOne(id)
    .subscribe({
      next: (v) => this.showDetailOk(v),
      error: (e) => this.showDetailError(e),
      complete: () => console.info('complete')
    });
  }

  showDetailOk(data: Product) {
    // this.toggleProductDetail();
    this.productChosen = data;
    this.statusDetail = 'success';
  };

  showDetailError( e: Error ) {
    // this.toggleProductDetail();
    this.statusDetail = 'error';
    console.error( e.message );
  }

  readAndUpdate(id: string) {
    this.productService.getOne(id)
        .pipe(
          switchMap( product => this.productService.update(product.id, { title: 'change'}) )
        )
        .subscribe( data => {
          console.log( data );
        });
    this.productService.fetchReaAndUpdate( id, { title: 'change'})
    .subscribe( response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 650,
      categoryId: 2
    }
    this.productService.create(product)
        .subscribe( data => {
          this.products.unshift( data );
        });
  }

  updateProduct() {
    const changes = {
      title: 'new title'
    };
    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe( data => {
      const productIndex = this.products.findIndex( item => item.id === id)
      this.products[productIndex] = data;
      this.productChosen = data;
      console.log( 'update', data );
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productService.delete(id)
    .subscribe( data => {
      const productIndex = this.products.findIndex( item => item.id === id)
      this.products.splice( productIndex, 1 );
      this.toggleProductDetail();
    } );
  }

}
