import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import {firstValueFrom} from "rxjs";
import {UserRole} from './user-role';
import {NavbarComponent} from '../components/navbar/navbar.component';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const navbar = inject(NavbarComponent)

  const expectedRole:UserRole[] = route.data['requiredRoles']

  return firstValueFrom(authService.getUser())
    .then(user => {
      if(!user) {
        router.navigate([  "/" ]);
        navbar.openLoginDialog()
      }

      if (user) {
        if(!expectedRole){
          return true;
        }

        if(expectedRole[0]==user.authorities[0].authority){
          return true;
        }
        router.navigate([  "/403" ]);
      }

      // never used
      return false;
    })
    .catch(() => router.navigate([  "/login" ])
    ); // Blocca l'accesso in caso di error

};
