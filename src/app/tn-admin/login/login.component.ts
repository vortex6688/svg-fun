import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionBackend } from '@angular/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService, Credentials } from '../../tn-common/auth';
import { User } from '../../tn-common/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public errorMessage: string = '';
  public user: User;
  public credentials: Credentials = {username: '', password: ''};

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {}

  public logIn(credentials: Credentials): void {
    this.authService.login(credentials).subscribe((result) => {
      this.user = result;
      console.log(this.user);
      // this.activeModal.dismiss();
    }, (error) => {
      this.handleErrorResponse(error);
    });
  }

  private handleErrorResponse(error) {
    if (error.status === 404) {
      this.errorMessage = 'The server can\'t be reached!';
    } else if (error.status === 401) {
      this.errorMessage = 'Invalid username or password';
    } else {
      this.errorMessage = 'An error happened!';
    }
    console.log(error);
  }
}
