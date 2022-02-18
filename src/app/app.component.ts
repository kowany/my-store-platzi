import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = '';
  showImg = true;
  token = '';
  profile = {};
  imgRta = '';

  constructor(
    private userService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService,
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if ( token ) {
      this.authService.getProfile()
        .subscribe();
    }
  }
  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toogleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: 'Jorgito',
      email: 'jorgito@mail.com',
      password: '123456',
      role: 'customer'
    })
    .subscribe( data => {
      console.log( data );
    });
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
        .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if ( file ) {
      this.filesService.uploadFile(file)
          .subscribe( rta => {
            this.imgRta = rta.location;
          });
    }
  }

}
