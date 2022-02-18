import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from './../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit() {
    const respuesta = confirm('Lógica desde el component. Estás seguro salir ?')
    return respuesta;
  }

}
