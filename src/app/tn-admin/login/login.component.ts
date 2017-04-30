import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectionBackend } from '@angular/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { AuthActions, Credentials } from '../../tn-common/auth';
import { User } from '../../tn-common/user/user.model';
import { getAuthState, getUser } from '../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public errorMessage: string = '';
  public credentials: Credentials = {username: '', password: ''};
  public loading;

  constructor(public activeModal: NgbActiveModal, private store: Store<any>, private authActions: AuthActions) {
    this.store.select(getAuthState).subscribe(({ isLoggedIn, inProgress, error }) => {
      if (isLoggedIn) {
        this.activeModal.close();
        return;
      }
      this.loading = inProgress;

      if (error) {
        this.handleErrorResponse(error);
      }
    });
  }

  public login(): void {
    this.store.dispatch(this.authActions.login(this.credentials));
  }

  private handleErrorResponse(error) {
    if (error.status === 404) {
      this.errorMessage = 'The server can\'t be reached!';
    } else if (error.status === 401) {
      this.errorMessage = 'Invalid username or password';
    } else {
      this.errorMessage = 'An error happened!';
    }
  }
}
