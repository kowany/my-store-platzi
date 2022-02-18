import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    // console.log('change just img => ', this.img);
    // code
  }
  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();
  imageDefault = './assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    // corre antes del render (before render)
    // es importante que en el constructor no corran cosas
    // asíncronas como una petición a un servidor ( fetch ),
    // solo corre una vez
    // console.log( 'constructor', 'imgValue =>', this.img );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before -- during render
    // su objetivo principal es estar actualizando los cambios en
    // los inputs, corre muchas veces, las veces que actualicemos
    // los inputs de nuestros componentes
    // console.log( 'ngOnChanges', 'imgValue =>', this.img );
    // console.log( 'changes', changes );
  }
  ngOnInit(): void {
    // before render - solo corre una vez
    // aquí es donde podemos correr cosas asíncronas ( fetch ),
    // al igual que el constructor corre solo una vez.
    // Es un error muy común querer detectar los cambio de los
    // inputs en el ngOnInit, cuando debe ser en el ngOnChanges

    // console.log( 'ngOnInit', 'imgValue =>', this.img );

    // this.counterFn = window.setInterval( () => {
    //   this.counter += 1;
    //   console.log( 'run counter' );
    // }, 1000 );
  }
  ngAfterViewInit(): void {
    // after render
    // handler children
    // regularmente se manejan los hijos, por ejemplo en nuestro
    // componente img, tenemos los siguienes hijos: img, ng-template

    // console.log( 'ngAfterViewInit' );
  }
  ngOnDestroy(): void {
    // delete component

    // console.log( 'ngOnDestroy' );

    // window.clearInterval( this.counterFn );
  }
  imgError() {
    this.img = this.imageDefault;
  }
  imgLoaded() {
    // console.log('load hijo');
    this.loaded.emit(this.img);
  }
}
