import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '../../utils/Response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login(): void {
    const email: string = 'webmaster@gmail.com';
    const password: string = 'secret';

    this.authService.login(email, password)
        .subscribe((response: any) => {
            const data: any = response.data;

            this.authService.saveStorage(data);
            this.router.navigate(['/']);
        }, (error: HttpErrorResponse) => {
            if (error.status ===  Response.HTTP_UNAUTHORIZED) {
                Swal.fire({
                  title: 'Error!',
                  text: error.error.message,
                  type: 'error'
                });
            }
        });
  }

}
