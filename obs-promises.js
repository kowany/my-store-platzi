const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');
// Las promesas emiten una sola respuesta, si
// colocamos varios resolve, únicamente se
// ejecutará el primero de ellos. Es simple de
// implementar. Las promesas no se pueden cancelar
const doSomethings = () => {
  return new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve('valor 3');
    }, 3000);
  })
}
// La característica principal de un observable
// es que permite emitir varios valores, también
// permite cancelar el observable en un mommento
// dado. Otra característica es que permite
// concatenar pipes, para transformar la información.
// Es posible escuchar constantemente: eventos,
// responsive, fetchs
const doSomethings$ = () => {
  return new Observable( observer => {
    observer.next('valor 1 $  ');
    observer.next('valor 2 $  ');
    observer.next('valor 3 $  ');
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 5000);
    setTimeout(() => {
      observer.next(null);
    }, 8000);
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 10000);
  });
}

(async () => {
  const rta = await doSomethings();
  console.log(rta);
})();

( () => {
  const obs$ = doSomethings$();
  obs$
    .pipe(
      filter( value => value !== null)
    )
    .subscribe( rta => console.log( rta ));
})()
