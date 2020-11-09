import { Injectable, CanActivate, ExecutionContext, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class OktaGuard implements CanActivate, OnModuleInit {

  oktaJwtVerifier: any;

  onModuleInit() {
    this.oktaJwtVerifier = new OktaJwtVerifier(
        {
          issuer: 'https://dev-6803287.okta.com.okta.com/oauth2/default',
          clientId: '0oalvb0qvYCWjX6xf5d5'
        });
    }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.getArgByIndex(0).headers.authorization;
    return this.oktaJwtVerifier.verifyAccessToken(token)
      .then(() => {
        return true;
      }, () =>{
        return false;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
}