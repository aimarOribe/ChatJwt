import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthModel } from '@mean/models';
import { AuthService } from '@mean/services';
import { SessionStorageConstants } from 'src/app/utils/session.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logo = '../../../assets/logo.png';
  showMenuLogin = true;
  userData!: AuthModel.User;

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    this.showMenuLogin = this.authService.readFromSession(SessionStorageConstants.USER_TOKEN).user.id === 0;

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
