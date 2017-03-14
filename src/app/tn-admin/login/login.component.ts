import { Component } from '@angular/core';

interface LoginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login: LoginForm = {username:'', password:''};

  constructor() { }

  public onSubmit(data) {
    console.log(JSON.stringify(data));
  }

}
