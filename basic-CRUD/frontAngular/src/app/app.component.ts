import { Component } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Angular+NestJS CRUD';
  public isAuthenticated = false;

  constructor(public _oktaAuth: OktaAuthService) {
    this.checkAuth();
  }

  checkAuth(){
    this._oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  async ngOnInit() {
    this.checkAuth();
  }

  login() {
    this._oktaAuth.signIn('');
  }

  logout() {
    this._oktaAuth.signOut();
  }
}