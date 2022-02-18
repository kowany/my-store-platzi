import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../services/auth.service'
import { CategoriesService } from './../../../services/categories.service';
import { StoreService } from './../../../services/store.service';

import { Category } from './../../../models/category.model';
import { User } from './../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  // @Input() profile = {};
  activeMenu = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$
        .subscribe( products => {
          this.counter = products.length;
        });
    this.getAllCategories();
    this.authService.user$
        .subscribe( data => this.profile = data );
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login() {
    this.authService.loginAndGet('john@mail.com', 'changeme')
      .subscribe( () => {
        this.router.navigate(['/profile']);
      } );
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['']);
  }
  getAllCategories() {
    this.categoriesService.getAll()
        .subscribe( data => {
          console.log( data );
          this.categories = data;
        } );
  }

}
