import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  logout(): void {
      this.authService.logout()
          .subscribe(() => {
            this.router.navigate(['/']);
          });
  }

}
